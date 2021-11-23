rm -rf dist
ncc build index.js --license licenses.txx
git add *
git commit -m "new"
git tag -a -m "update param" v2.0.6
git push --follow-tags