#!/bin/bash
mkdir -p .tb-data && sudo chown -R 799:799 .tb-data
mkdir -p .tb-logs && sudo chown -R 799:799 .tb-logs

sudo docker compose pull
sudo docker compose up -d