#!/bin/bash
# FreeLingo — arranque local (sin Docker)
# Lee variables del .env y lanza backend + frontend

if [ ! -f .env ]; then
  echo "Falta .env — copia .env.example a .env y pon tu NAN_API_KEY"
  exit 1
fi
export $(grep -v '^#' .env | xargs)

echo "=== Arrancando backend ==="
cd backend
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

echo "=== Arrancando frontend ==="
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "  Backend:  http://localhost:8000"
echo "  Frontend: http://localhost:3000"
echo ""
echo "Pulsa Ctrl+C para parar ambos"
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT
wait