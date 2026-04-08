# Migrate to V8.0.0

> **Note for Standard Deployments:** If you use the standard RAS containers with the latest version of Docker, this migration typically has no impact on your deployment.

## Overview

RAS V8.0.0 introduces breaking changes primarily driven by backend package updates and Docker orchestration improvements. This guide walks you through the migration process.

## Prerequisites

- **Docker:** Version 28.1.1 or later (required)
- **Docker Compose:** Latest version (required for new bake feature support)

## Key Changes

### 1. Python Package Management - UV

Python package management has been migrated from traditional package managers to **UV** with a unified local cache shared across all Docker containers. This provides:
- Faster dependency resolution and installation
- Consistent package versions across containers
- Reduced build times

**What this means for you:** No action required unless you have custom backend containers with Python dependencies. If so, update your Dockerfiles to use UV syntax.

### 2. Docker Base Image Update

The EPICS base image has been updated to **Ubuntu 24.04 LTS**. 

**What this means for you:** If you extend or customize the epicsbase container, verify your custom packages and configurations are compatible with Ubuntu 24.04.

### 3. Updated Container Architecture - EPICS base

The `epicsbase` container is now the foundational layer for all backend containers. It includes:
- EPICS 7.0.9
- Python environment through UV
- All shared dependencies

**What this means for you:** Backend container builds are now more efficient through shared base layers.

## Migration Steps

### For Custom Docker Compose Files

If you have customized `docker-compose.yml` files, add the following to any backend services that depend on epicsbase:

```yaml
services:
  your_service:
    build:
      context: ./docker/your_service
      additional_contexts:
        epicsbase: "service:epicsbase"
    depends_on:
      - epicsbase
```

**Example:**
```yaml
alarmHandlerServer:
  build:
    context: ./docker/alarmHandlerServer
    additional_contexts:
      epicsbase: "service:epicsbase"
  depends_on:
    - epicsbase
```

### Enable Docker Compose Bake (Optional but Recommended)

Docker Compose Bake significantly speeds up multi-container builds. To enable it:

1. Edit your Docker config file: `$HOME/.docker/config.json`
2. Add the `compose` plugin configuration:

```json
{
  "plugins": {
    "compose": {
      "build": "bake"
    }
  }
}
```

**Reference:** https://docs.docker.com/compose/how-tos/dependent-images/

## Verification

After migrating, verify your setup:

```bash
# Check Docker version
docker --version  # Should be 28.1.1 or later

# Test building with the new epicsbase
docker compose build epicsbase

# Verify bake is enabled (optional)
docker buildx ls
```

## Troubleshooting

### Issue: "additional_contexts" is an invalid option
- **Cause:** Using an older version of Docker or Docker Compose
- **Solution:** Update to Docker 28.1.1+ and latest Docker Compose

### Issue: Build fails on custom backend service
- **Cause:** ImageLayers may be incompatible with Ubuntu 24.04
- **Solution:** Test custom Dockerfiles with the new base image and update package versions as needed

### Issue: Slow builds even with Bake enabled
- **Cause:** Bake not properly configured or Docker daemon needs restart
- **Solution:** Restart Docker daemon and verify `docker buildx ls` shows buildx available




