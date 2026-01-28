#!/bin/bash
cd client/components/icons
for file in "[LD 3.5] "*.svg; do
    newname="${file#[LD 3.5] }"
    mv "$file" "$newname"
done
