import asyncio
from src.flows.daily_harvest import daily_harvest_flow

if __name__ == "__main__":
    asyncio.run(daily_harvest_flow())
