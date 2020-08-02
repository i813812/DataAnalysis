cat ./DA.BEGIN.TXT >./Data.Analysis.offline.HTML;
cat ./MCCDA.js >>./Data.Analysis.offline.HTML;
cat ./DA.SCRIPT.TXT >>./Data.Analysis.offline.HTML;
echo Download Plotly plotly-latest.min.js
curl -O https://cdn.plot.ly/plotly-latest.min.js;
cat ./plotly-latest.min.js >>./Data.Analysis.offline.HTML;
cat ./DA.SCRIPT.TXT >>./Data.Analysis.offline.HTML;
echo Download XLSX - xlsx.full.min.js
curl -O https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.1/xlsx.full.min.js;
cat ./xlsx.full.min.js >>./Data.Analysis.offline.HTML;
cat ./DA.SCRIPT.TXT >>./Data.Analysis.offline.HTML;
echo Download JSZIP - jszip.min.js
curl -O https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js;
cat ./xlsx.full.min.js >>./Data.Analysis.offline.HTML;
cat ./DA.FOOTER.TXT >>./Data.Analysis.offline.HTML;