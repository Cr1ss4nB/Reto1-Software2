from fastapi import FastAPI
import os

from controller.order_controller import router as order_router
from eureka import start_eureka_registration, stop_eureka_registration

app = FastAPI(title="OrderMgmtMicroservice")

if os.getenv("LOCAL_DEV_CORS", "0").lower() in ("1", "true", "yes"):
    from fastapi.middleware.cors import CORSMiddleware  # import interno solo si se usa
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    print("[CORS] Activado localmente (LOCAL_DEV_CORS=1) solo para http://localhost:3000")
else:
    print("[CORS] No configurado aquí. Se espera que el Gateway maneje CORS.")

app.include_router(order_router, prefix="/order")


@app.get("/health")
async def health():
    return {"status": "UP"}


@app.on_event("startup")
async def startup_event():
    await start_eureka_registration()


@app.on_event("shutdown")
async def shutdown_event():
    await stop_eureka_registration()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8082)
