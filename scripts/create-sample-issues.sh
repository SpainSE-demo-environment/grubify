#!/bin/bash
# =============================================================================
# Create Sample Patient Issues for Clinify App
#
# Creates 5 realistic patient-reported issues with [Customer Issue] prefix.
# These simulate real user complaints — the issue-triager will classify,
# label, and comment on them.
#
# Requires: GITHUB_PAT (or GITHUB_PAT_VALUE) with 'repo' scope
#
# Usage:
#   export GITHUB_PAT=<your-github-pat>
#   ./scripts/create-sample-issues.sh [owner/repo]
# =============================================================================
set -uo pipefail

REPO="${1:-${GITHUB_REPO:-}}"
PAT="${GITHUB_PAT:-${GITHUB_PAT_VALUE:-}}"

if [ -z "$REPO" ]; then
  echo "Usage: $0 <owner/repo>"
  echo "  or: export GITHUB_REPO=owner/repo && $0"
  exit 1
fi

if [ -z "$PAT" ]; then
  echo "Error: GITHUB_PAT not set"
  exit 1
fi

API="https://api.github.com/repos/${REPO}/issues"
AUTH="Authorization: token ${PAT}"

create_issue() {
  local title="$1"
  local body="$2"
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "$API" \
    -H "$AUTH" \
    -H "Content-Type: application/json" \
    -d "{\"title\": \"$title\", \"body\": \"$body\"}")
  if [ "$HTTP_CODE" = "201" ]; then
    echo "   ✅ $title"
  else
    echo "   ⚠️  HTTP $HTTP_CODE: $title"
  fi
}

echo ""
echo "📝 Creating sample patient issues in ${REPO}..."
echo ""

create_issue \
  "[Customer Issue] App crashes when adding services to cart" \
  "Hola, estoy intentando añadir servicios a mi cesta de citas en la app Clinify pero no deja de fallar. Recibo un error del servidor después de añadir unos 5-6 servicios rápidamente. La página solo muestra un mensaje de error genérico.\\n\\nEsto empezó a pasar hoy sobre las 15:00. ¿Alguien puede revisarlo?"

create_issue \
  "[Customer Issue] Clinics page is loading very slowly" \
  "La página de centros médicos tarda una eternidad en cargar. Antes era instantánea pero ahora tarda 10-15 segundos.\\n\\nTengo buena conexión a internet así que no creo que sea cosa mía. ¿Hay algún problema con el servidor?"

create_issue \
  "[Customer Issue] Can't book an appointment - getting 500 error" \
  "Cuando pulso Confirmar cita me sale un Internal Server Error. Lo he intentado varias veces con distintos servicios. Mi cesta tiene servicios pero la cita no llega a confirmarse.\\n\\nPor favor arregladlo cuanto antes, necesito ver al médico."

create_issue \
  "[Customer Issue] Feature request - add search for clinics" \
  "Estaría genial poder buscar centros médicos por nombre o especialidad en lugar de desplazarme por toda la lista.\\n\\n¿Podéis añadir una barra de búsqueda en la página de centros?"

create_issue \
  "[Customer Issue] How do I clear my appointment cart?" \
  "Añadí algunos servicios a mi cesta por error y no consigo saber cómo quitarlos. ¿Hay alguna forma de vaciar la cesta o eliminar servicios individuales? No veo ningún botón de borrar por ninguna parte."

echo ""
echo "✅ Created 5 sample patient issues in ${REPO}"
echo "   Run the triage scheduled task to classify them!"
