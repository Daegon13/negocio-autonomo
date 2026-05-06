$ErrorActionPreference = "Stop"

Write-Host "== Negocio Autónomo dev bootstrap =="

$dockerDesktopPath = "C:\Program Files\Docker\Docker\Docker Desktop.exe"

if (-not (Test-Path $dockerDesktopPath)) {
  Write-Host "Docker Desktop no fue encontrado en: $dockerDesktopPath"
  Write-Host "Abrí Docker Desktop manualmente o corregí la ruta en scripts/dev-start.ps1"
  exit 1
}

Write-Host "Abriendo Docker Desktop..."
Start-Process -FilePath $dockerDesktopPath

Write-Host "Esperando Docker engine..."
do {
  Start-Sleep -Seconds 3
  docker version *> $null
  $dockerReady = $LASTEXITCODE -eq 0

  if (-not $dockerReady) {
    Write-Host "Todavía esperando Docker..."
  }
} until ($dockerReady)

docker context use desktop-linux | Out-Null

Write-Host "Verificando contenedor PostgreSQL..."

$containerName = "negocio-autonomo-db"
$containerExists = docker ps -a --format "{{.Names}}" | Select-String -Pattern "^$containerName$"

if ($containerExists) {
  Write-Host "Arrancando contenedor existente: $containerName"
  docker start $containerName | Out-Null
} else {
  Write-Host "Creando contenedor PostgreSQL: $containerName"

  docker volume create negocio-autonomo-pgdata | Out-Null

  docker run -d `
    --name $containerName `
    -e POSTGRES_PASSWORD=postgres `
    -e POSTGRES_USER=postgres `
    -e POSTGRES_DB=negocio_autonomo `
    -e PGDATA=/var/lib/postgresql/18/docker `
    -p 5432:5432 `
    -v negocio-autonomo-pgdata:/var/lib/postgresql `
    postgres:18 | Out-Null
}

Write-Host "Esperando PostgreSQL..."
Start-Sleep -Seconds 4

Write-Host "Ejecutando migraciones Prisma..."
pnpm exec prisma migrate dev

Write-Host "Generando Prisma Client..."
pnpm exec prisma generate

Write-Host "Iniciando Next.js..."
pnpm run dev:next
