#!/bin/sh

rsync -r app-templates/base-project/* ./ --ignore-existing
