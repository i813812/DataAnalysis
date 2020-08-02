cd /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/offline
cat /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/offline/DA.BEGIN.TXT >./Data.Analysis.offline.HTML;
cat /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/hosted/MCCDA.js >>./Data.Analysis.offline.HTML;
cat /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/offline/DA.SCRIPT.TXT >>./Data.Analysis.offline.HTML;
curl -O https://cdn.plot.ly/plotly-latest.min.js;
cat /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/offline/plotly-latest.min.js >>./Data.Analysis.offline.HTML;
cat /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/offline/DA.SCRIPT.TXT >>./Data.Analysis.offline.HTML;
curl -O https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.1/xlsx.full.min.js;
cat /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/offline/xlsx.full.min.js >>./Data.Analysis.offline.HTML;
cat /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/offline/DA.SCRIPT.TXT >>./Data.Analysis.offline.HTML;
curl -O https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js;
cat /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/offline/jszip.min.js >>./Data.Analysis.offline.HTML;
cat /Users/i813812/OneDrive\ -\ SAP\ SE/Performance/Data\ Analysis/offline/DA.FOOTER.TXT >>./Data.Analysis.offline.HTML;