package eureka

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
)

var (
	appName    = getenv("APP_NAME", "user-mgmt-service")
	eurekaCons = getenv("EUREKA_SERVER", "http://localhost:8761/eureka/apps")
	hostname   = getenv("EUREKA_HOSTNAME", "localhost")
	port       = getenv("SERVER_PORT", "8083")
	instanceId = fmt.Sprintf("%s:%s:%s", hostname, appName, port)
	client     = &http.Client{Timeout: 5 * time.Second}
	ticker     *time.Ticker
)

func RegisterAndHeartbeat() {
	register()
	interval := 10
	if v := os.Getenv("EUREKA_HEARTBEAT_INTERVAL"); v != "" {
		fmt.Sscanf(v, "%d", &interval)
	}
	ticker = time.NewTicker(time.Duration(interval) * time.Second)
	go func() {
		for range ticker.C {
			heartbeat()
		}
	}()
}

func register() {
	url := fmt.Sprintf("%s/%s", strings.TrimRight(eurekaCons, "/"), strings.ToUpper(appName))
	payload := fmt.Sprintf(`<instance>
    <instanceId>%s</instanceId>
    <hostName>%s</hostName>
    <app>%s</app>
    <ipAddr>127.0.0.1</ipAddr>
    <status>UP</status>
    <port enabled="true">%s</port>
    <securePort enabled="false">443</securePort>
    <homePageUrl>http://%s:%s/</homePageUrl>
    <statusPageUrl>http://%s:%s/health</statusPageUrl>
    <healthCheckUrl>http://%s:%s/health</healthCheckUrl>
    <vipAddress>%s</vipAddress>
</instance>`, instanceId, hostname, strings.ToUpper(appName), port, hostname, port, hostname, port, hostname, port, appName)

	req, _ := http.NewRequest("POST", url, bytes.NewBufferString(payload))
	req.Header.Set("Content-Type", "application/xml")
	_, err := client.Do(req)
	if err != nil {
		fmt.Printf("Eureka register error: %v\n", err)
		return
	}
	fmt.Printf("Registered in eureka: %s\n", url)
}

func heartbeat() {
	url := fmt.Sprintf("%s/%s/%s", strings.TrimRight(eurekaCons, "/"), strings.ToUpper(appName), instanceId)
	req, _ := http.NewRequest("PUT", url, nil)
	_, err := client.Do(req)
	if err != nil {
		fmt.Printf("Eureka heartbeat error: %v\n", err)
	}
}

func Deregister() {
	if ticker != nil {
		ticker.Stop()
	}
	url := fmt.Sprintf("%s/%s/%s", strings.TrimRight(eurekaCons, "/"), strings.ToUpper(appName), instanceId)
	req, _ := http.NewRequest("DELETE", url, nil)
	_, err := client.Do(req)
	if err != nil {
		fmt.Printf("Eureka deregister error: %v\n", err)
	}
	fmt.Println("Deregistered from Eureka.")
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
