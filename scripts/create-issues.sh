#!/usr/bin/env bash
# create-issues.sh — cria os rótulos e as 30 Issues a partir de docs/issues/*.md usando a GitHub CLI.
# Uso (professor, uma única vez, dentro da pasta do repositório clonado e autenticado com `gh auth login`):
#   bash scripts/create-issues.sh                 # cria rótulos e Issues
#   bash scripts/create-issues.sh duplas.csv      # também atribui (CSV: dupla,login_integrante_A,login_integrante_B)
# Observação: este script usa apenas comandos documentados da GitHub CLI, mas depende da sua conta e
# do repositório reais; teste primeiro em um repositório de ensaio.
set -euo pipefail

CSV="${1:-}"
cd "$(dirname "$0")/.."

echo "Criando rótulos…"
for r in 1 2 3; do gh label create "rodada-$r" --color 1F4E79 --force >/dev/null; done
for d in $(seq -w 1 10); do gh label create "dupla-$d" --color 2E75B6 --force >/dev/null; done
gh label create funcionalidade --color 0E8A16 --force >/dev/null
gh label create ajuda --color D93F0B --force >/dev/null

for file in docs/issues/F*.md; do
  title="$(grep -m1 '^# ' "$file" | sed 's/^# //')"
  labels="$(grep -m1 '<!-- labels:' "$file" | sed -E 's/<!-- labels: (.*) -->/\1/')"
  body="$(mktemp)"
  grep -v '^<!-- labels:' "$file" | sed '1,/^# /{/^# /d}' > "$body"
  url="$(gh issue create --title "$title" --body-file "$body" --label "$labels")"
  number="${url##*/}"
  echo "#$number  $title"

  if [[ -n "$CSV" && -f "$CSV" ]]; then
    d="$(echo "$labels" | grep -o 'dupla-[0-9]*' | sed 's/dupla-//')"
    r="$(echo "$labels" | grep -o 'rodada-[0-9]' | sed 's/rodada-//')"
    row="$(awk -F, -v d="$((10#$d))" '$1+0==d {print $2","$3}' "$CSV" | head -1 | tr -d '\r')"
    a="${row%%,*}"; b="${row##*,}"
    if [[ -n "$row" ]]; then
      if [[ "$r" == "2" ]]; then gh issue edit "$number" --add-assignee "$b" >/dev/null
      else gh issue edit "$number" --add-assignee "$a" >/dev/null; fi
      [[ "$r" == "3" ]] && gh issue edit "$number" --add-assignee "$b" >/dev/null
    fi
  fi
  rm -f "$body"
done
echo "Pronto: 30 Issues criadas."
