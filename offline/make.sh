cd /Users/i813812/OneDrive\ -\ SAP\ SE/GitHub/DataAnalysis/offline
cat ./DA.BEGIN.TXT >./Data.Analysis.offline.HTML;
cat ../hosted/MCCDA.js >>./Data.Analysis.offline.HTML;
cat ./DA.SCRIPT.TXT >>./Data.Analysis.offline.HTML;
curl -O https://cdn.plot.ly/plotly-latest.min.js;
cat ./plotly-latest.min.js >>./Data.Analysis.offline.HTML;
cat ./DA.SCRIPT.TXT >>./Data.Analysis.offline.HTML;
curl -O https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.1/xlsx.full.min.js;
cat ./xlsx.full.min.js >>./Data.Analysis.offline.HTML;
cat ./DA.SCRIPT.TXT >>./Data.Analysis.offline.HTML;
curl -O https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js;
cat ./jszip.min.js >>./Data.Analysis.offline.HTML;
cat ./DA.FOOTER.TXT >>./Data.Analysis.offline.HTML;