'use strict';
/*jslint node: true */
/*jshint esversion: 6 */
/*jslint bitwise: true */

// (C)hristoph Weyd - c.weyd@sap.com / christoph.weyd@gmail.com
// 
// https://jam4.sapjam.com/groups/ptqhagz5ePB2nGoqApUgbB/documents/Tml4yXpWTD3ssgyGVJP7FL 
//
// https://plot.ly/javascript/line-and-scatter/
// https://github.com/plotly/plotly.js
// https://jshint.com
// -->

var prgvers = "8.10";

// arrays
var dtmp = [];
var data = [];
var vdat = [];
var zdat = [];
var sdat = [];
var cntlbl = [];
var cntmin = [];
var cntmax = [];
var cntval = [];
var cntcum = [];
var header = [];
var filelist = [];
var globalhd = true;
var globalhdend = "";
var globalnum = 0;

// Variables
var dati = 0;
var txtarea = "";
var colsep = "";
var ymin = 0;
var ymax = 0;
var zmin = 0;
var zmax = 0;
var xmin = 0;
var xmax = 0;
var xlen = 0;
var pval = 0;
var tickf = "";
var gwidth = 0.75;
var hwidth = 0.25;
var sheight = 0.75;
var hsel = 'min';
var vmin = "";
var vmax = "";
var evdata = "";
var start = true;
var sspace = false;
var slegend = false;
var average = 0;
var FWHM = 0;
var slider = false;
var tmptl = "";
var dprev = false;
var keyshift = false;
var DAC = false;
var selhdr = "";
var zip;
var hlegposx = 0.25;
var hlegposy = 0.85;
var mlegposx = 0;
var mlegposy = -0.35;
var slegposx = 1;
var slegposy = 1;
var hdrs = 1;
var usefnam = false;
var trex = false;
var textcont = "";

// Program parameters
var inparam = {
	ustat: true,
	selx1: "",
	selx2: "",
	selx3: "",
	selx4: "",
	selfx: "",
	sely1: "",
	sely2: "",
	sely3: "",
	sely4: "",
	selfc: "",
	vstack: "",
	xinpmin: "",
	hstinpmin: "",
	xinpmax: "",
	hstinpmax: "",
	xdtick: "",
	tround: false,
	sround: 300,
	cleand: true,
	sshape: "linear",
	filter: "",
	selopt: "==",
	scnt: 100,
	ytmin: "",
	ytmax: "",
	fact: 1,
	grtype: "",
	logdis: false,
	stsel: "ADD",
	opr: "AVG",
	maxpnt: 10000,
	dtsize: 3,
	avgint: "",
	Gw: 0,
	Hw: 0,
	SGw: 0,
	SHw: 0,
	smooth: false,
	showhist: true,
	gtitle: "",
	xtitle: "",
	ytitle: "",
	cfonts: 16,
	afonts: 14,
	tfonts: 10,
	datind: "",
	bgcolor: '#F4F4F4',
	chcolor: '#FEFEFE',
	fgcolor: '#444444',
	grcolor: '#DDDDDD',
	ptcolor: '#002E7A',
	p1color: '#016D8F',
	p2color: '#FFB440',
	p3color: '#7B209F',
	colsc: [
		[0, '#74a7fe'],
		[0, '#ff9900'],
		[0, '#ff0000'],
		[0, '#660066']
	],
	selz1: "",
	selz2: "",
	selz3: "",
	selz4: "",
	ztmin: "",
	ztmax: "",
	grztype: "line",
	zlogdis: false,
	zshape: "linear",
	pzcolor: '#FFA500',
	ztsize: 1,
	sndyaxis: false,
	opaci: 0.75,
	zopac: 0.5
};

// Input parameter history
var ppt = 0;
var parhst = [];
parhst[0] = inparam;

// Date Formats
var dtfrm = [
	[0, 'YYYY-MM-DD', /(\d{4})[\/.-](\d{2})[\/.-](\d{2})/],
	[1, 'DD-MM-YYYY', /(\d{2})[\/.-](\d{2})[\/.-](\d{4})/],
	[2, 'YY-MM-DD', /(\d{2})[\/.-](\d{2})[\/.-](\d{2})/],
	[3, 'DD-MM-YY', /(\d{2})[\/.-](\d{2})[\/.-](\d{2})/],
	[4, 'YYYY-DD-MM', /(\d{4})[\/.-](\d{2})[\/.-](\d{2})/],
	[5, 'MM-DD-YYYY', /(\d{2})[\/.-](\d{2})[\/.-](\d{4})/],
	[6, 'YY-DD-MM', /(\d{2})[\/.-](\d{2})[\/.-](\d{2})/],
	[7, 'MM-DD-YY', /(\d{2})[\/.-](\d{2})[\/.-](\d{2})/]
];

var hdrpos = 0;
var decpnt = '.';

// Column Delimiters
var delim = [
	[0, ","],
	[0, ";"],
	[0, "|"],
	[0, "\t"],
	[0, "/"]
];

var detect = true;
var wait = false;
var init = true;
var maxys = 0;
var infile = [];
var tmpfile = "";
var prephd = true;
var textarea = "";
var tplclick = 0;
var hstmin = "";
var hstmax = "";
var lnsize = 1;
var lntype = 'solid';
var chtype = 'scatter';
var chmode = 'markers';
var zhtype = 'scatter';
var zhmode = 'markers';
var stmode = 'group';
var filmod = '';
var filmoz = '';
var sgroup0 = '';
var sgroup1 = '';
var sgroup2 = '';
var sgroup3 = '';
var filecnt = 0;
var fname = '';
var upt = 0;
var excelwb;
var p0 = 0;
var p1 = 0;
var p2 = 0;
var pb = 0;
var displaymode = "";
var autohide = false;
var impel = null;
var previewstyle = false;
var mainstyle = false;

// var AudioContextCtor = window.AudioContext || window.webkitAudioContext; var audioCtx = new AudioContextCtor();

function setData(cname, cvalue) {
	// save data to local browser storage
	try {
		localStorage.setItem(cname, escape(cvalue));
	} catch (e) { }
}

function perfnow() {
	// set performance counter
	var ts = performance.now();
	console.log('Time: ' + ts);
	// console.log(new Error().stack);
	return ts;
}

function getData(cname) {
	// read data from local storage
var temp;
	try {
		temp = localStorage.getItem(cname);
	} catch (e) { }
	if (temp === null) {
		temp = "";
	}
	return unescape(temp);
}

function loadhist() {
	// load history
	addhist();
	var vStorageName = "DataAnalysis";
	var obj = getData(vStorageName);
	var tmp = JSON.parse(obj);
	parhst[ppt] = tmp;
	parhst[ppt].Gw = 0;
	parameters();
	graphic();
}

function loaddefault() {
	// load default values
	var vStorageName = "Default";
	var obj = getData(vStorageName);
	if (obj == "") return;
	var tmp = JSON.parse(obj);
	parhst[ppt].tround = tmp.tround;
	parhst[ppt].sround = tmp.sround;
	parhst[ppt].cleand = tmp.cleand;
	parhst[ppt].sshape = tmp.sshape;
	parhst[ppt].grtype = tmp.grtype;
	parhst[ppt].opr = tmp.opr;
	parhst[ppt].maxpnt = tmp.maxpnt;
	parhst[ppt].dtsize = tmp.dtsize;
	parhst[ppt].avgint = tmp.avgint;
	parhst[ppt].Gw = tmp.Gw;
	parhst[ppt].Hw = tmp.Hw;
	parhst[ppt].SGw = tmp.SGw;
	parhst[ppt].SHw = tmp.SHw;
	parhst[ppt].smooth = tmp.smooth;
	parhst[ppt].showhist = tmp.showhist;
	parhst[ppt].bgcolor = tmp.bgcolor;
	parhst[ppt].chcolor = tmp.chcolor;
	parhst[ppt].fgcolor = tmp.fgcolor;
	parhst[ppt].grcolor = tmp.grcolor;
	parhst[ppt].ptcolor = tmp.ptcolor;
	parhst[ppt].p1color = tmp.p1color;
	parhst[ppt].p2color = tmp.p2color;
	parhst[ppt].p3color = tmp.p3color;
	parhst[ppt].colsc = [
		[tmp.colsc[0][0], tmp.colsc[0][1]],
		[tmp.colsc[1][0], tmp.colsc[1][1]],
		[tmp.colsc[2][0], tmp.colsc[2][1]],
		[tmp.colsc[3][0], tmp.colsc[3][1]]
	];
	parhst[ppt].selz1 = tmp.selz1;
	parhst[ppt].selz2 = tmp.selz2;
	parhst[ppt].selz3 = tmp.selz3;
	parhst[ppt].selz4 = tmp.selz4;
	parhst[ppt].ztmin = tmp.ztmin;
	parhst[ppt].ztmax = tmp.ztmax;
	parhst[ppt].grztype = tmp.grztype;
	parhst[ppt].zlogdis = tmp.zlogdis;
	parhst[ppt].zshape = tmp.zshape;
	parhst[ppt].pzcolor = tmp.pzcolor;
	parhst[ppt].ztsize = tmp.ztsize;
	parhst[ppt].sndyaxis = tmp.sndyaxis;
	parhst[ppt].zopac = tmp.zopac;
	parhst[ppt].opaci = tmp.opaci;
}

function dnlexport() {
	// export data
	download("DataAnalysis.Export.xls", document.getElementById('IDtextarea').value);
}

function download(filename, text) {
	// Download File
	// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function download64(filename, filecontent) {
	// Download File
	// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
	var element = document.createElement('a');
	element.setAttribute('href', 'data:application/zip;base64,' + filecontent);
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function expset() {
	// trigger export of configuration JSON file
	var tmp = parhst[ppt];
	var obj;
	var filename;
	if (keyshift) {
		keyshift = false;
		document.getElementById('IDEXP').innerHTML = "Exp.";
		document.title = 'Export Data';
		zip = new JSZip();
		var container = {
			id: 'DataAnalysisContainer',
			config: tmp,
			ghead: header,
			gdata: data
		};
		obj = JSON.stringify(container);
		document.title = 'add data to ZIP container';
		if (filelist.length > 0) {
			filename = prompt("Specify name of DataAnalysis container:", filelist[0].name);
		} else {
			filename = prompt("Specify name of DataAnalysis container:", "DataAnalysisContainer");
		}
		if (filename == null) return;
		if (filename == "") filename = "DataAnalysisContainer";
		filename = filename.replace(".dac", "");
		zip.file(filename + ".dac", obj);
		zip.generateAsync({
				type: "base64",
				compression: "DEFLATE",
				compressionOptions: {
					level: 5
				}
			},
			function updateCallback(metadata) {
				document.title = "compress container " + metadata.percent.toFixed(2) + " % ";
			}
		).then(function(base64) {
			download64(filename + ".dzip", base64);
		});
	} else {
		obj = JSON.stringify(tmp);
		filename = prompt("Specify name of configuration file:", "*.json");
		if (filename == null) return;
		if (filename == "") filename = "DataAnalysisConfig";
		if (!filename.endsWith(".json")) filename += ".json";
		download(filename, obj);
	}
}

function importconfig() {
	// Import selected configuration file and apply
	document.body.style.cursor = "progress";
	addhist();
	setTimeout(function() {
		var impfile = document.getElementById('IMPORT').files;
		var reader = new FileReader();
		if (impfile[0].name.endsWith(".dac")) {
			reader.onload = function() {
				var obj = reader.result;
				if (!obj.includes('DataAnalysisContainer')) return;
				var container = JSON.parse(obj);
				parhst[ppt] = container.config;
				data = container.gdata;
				header = container.ghead;
				document.body.removeChild(impel);
				parameters();
				graphic();
			};
			reader.readAsText(impfile[0], "UTF-8");
		} else {
			reader.onload = function() {
				var obj = reader.result;
				var tmp = JSON.parse(obj);
				parhst[ppt] = tmp;
				parhst[ppt].Gw = 0;
				parhst[ppt].xinpmin = "";
				parhst[ppt].xinpmax = "";
				document.body.removeChild(impel);
				parameters();
				graphic();
			};
			reader.readAsText(impfile[0], "UTF-8");
		}
	}, 25);

}

function impset() {
	// trigger file select dialog to import configuration file
var tmp;
var obj;
	document.body.style.cursor = "progress";
	document.title = 'Data Analysis - import configuration ... ';
	document.getElementById("IDDOT").className = "dotred";
	document.getElementById("IDDOT").hidden = true;
	document.getElementById("IDDOT").hidden = false;

	if (keyshift) {
		keyshift = false;
		document.getElementById('IDEXP').innerHTML = "Exp.";
		tmp = parhst[ppt];
		obj = JSON.stringify(tmp);
		impel = document.createElement('input');
		impel.setAttribute('type', 'file');
		impel.setAttribute('id', 'IMPORT');
		impel.setAttribute('onchange', 'importconfig()');
		impel.setAttribute('accept', '.dac');
		impel.setAttribute('hidden', 'true');
		document.body.appendChild(impel);
		impel.click();
	} else {
		tmp = parhst[ppt];
		obj = JSON.stringify(tmp);
		impel = document.createElement('input');
		impel.setAttribute('type', 'file');
		impel.setAttribute('id', 'IMPORT');
		impel.setAttribute('onchange', 'importconfig()');
		impel.setAttribute('accept', '.json');
		impel.setAttribute('hidden', 'true');
		document.body.appendChild(impel);
		impel.click();
	}
}

function savehist() {
	// save parameters
	var tmp = parhst[ppt];
	var vStorageName = "DataAnalysis";

	var obj = JSON.stringify(tmp);

	setData(vStorageName, obj);
}

function savedefault() {
	// save current parameters as default
	var tmp = parhst[ppt];
	var vStorageName = "Default";

	var obj = JSON.stringify(tmp);

	setData(vStorageName, obj);
}

function processFiles(event) {
	// Process Selected Input file list
	document.body.style.cursor = "progress";
	filelist = document.getElementById('files').files;
	dprev = document.getElementById('IDcheckpreview').checked;
	document.title = 'loading data....';
	document.body.style.cursor = "progress";
	p0 = perfnow();
	DAC = false;
	
	if (event.target.id == 'IDtextarea') {
		filelist = event.dataTransfer.files;
		for (var i = 0; i < filelist.length; i++) {
   	 		readtext(filelist[i], filelist.length, i + 1);
  		}
  		return;
	}

	// open Excel XLSX files 
	if (filelist[0].name.endsWith('.xlsx')) {
		if (filelist[0].size > 16777216) {
			alert('Import Excel files is limited to 16MB \n\n Please open file with excel and copy & paste into input area');
		} else {
			fname = filelist[0].name;
			document.getElementById('IDdata').innerHTML = "";
			document.getElementById("IDbutupd").style.display = "none";
			readexcel(filelist[0]);
		}
		return;
	}

	// open compressed DataAnalysisContainer
	if (filelist[0].name.endsWith('.dzip')) {
		JSZip.loadAsync(filelist[0]).then(function(zip) {
			Object.keys(zip.files).forEach(function(filename) {
				zip.files[filename].async('string').then(function(fileData) {
					if (fileData.includes('DataAnalysisContainer')) {
						var container = JSON.parse(fileData);
						parhst[ppt] = container.config;
						addhist();
						data = container.gdata;
						header = container.ghead;
						DAC = true;
						parameters();
					}
					return;
				});
			});
		});
		document.body.style.cursor = "default";
		return;
	}

	data = [];
	txtarea = "";
	infile = [];
	filecnt = 0;
	prephd = true;
	detect = true;

	var flname = "";

	// get file extension of first file
	var fext = '';
	var fcnt = 0;
	var i = 0;
	for (i = 0; i < filelist.length; i++) {
		if (filelist[i].name.startsWith(".")) continue;
		if (fext == "") {
			fext = '.' + filelist[i].name.split('.').pop();
			fname = filelist[i].name;
		}
		if (filelist[i].name.endsWith(fext)) {
			fcnt = fcnt + 1;
			flname = filelist[i].name;
		}
	}
	if (filelist.length > 1) fname += "..." + flname;

	// only read files with matching file extensions
	document.getElementById('IDdata').innerHTML = "";
	for (i = 0; i < filelist.length; i++) {
		if (filelist[i].name.startsWith(".")) continue;
		  if (filelist[i].name.endsWith(fext)) readfile(filelist[i], fcnt, i + 1);
      // if (filelist[i].name.endsWith(fext)) setTimeout(readfile, 10 , filelist[i], fcnt, i + 1);
	}

	document.getElementById('IDdata').innerHTML = "";
	document.getElementById("IDbutupd").style.display = "none";
}

function readtext(file, numtotal, filenum) {
  // read selected input file
  var reader = new FileReader();
  document.getElementById("IDtextarea").value  = "";
  reader.onload = function() {
  	debugger;
    textcont += reader.result + "\n";
    if (filenum == numtotal) {
      document.getElementById("IDtextarea").value = textcont;
    }
  };
  reader.readAsText(file);
}


function parsexcel() {
	// if excel workbook has more than 1 worksheet read selection
	p0 = performance.now() - (p1 - p0);
	var wbsel;
	if (excelwb.SheetNames.length > 1) wbsel = document.getElementById('IDexcelwb').value;
	else wbsel = 0;

	fname += ' (Worksheet: ' + excelwb.SheetNames[wbsel] + ')';

	var text = "";
	try {
		text = XLSX.write(excelwb, {
			sheet: excelwb.SheetNames[wbsel],
			type: 'binary',
			bookType: 'html'
		});
	} catch (err) {}

	var re = new RegExp('' + '', 'g');
	text = text.replace(/(\r)/gm, "");
	text = text.replace(/(\n)/gm, "");
	re = new RegExp('' + escapeRegExp('<style>') + '.+' + escapeRegExp('</style>') + '', 'g');
	text = text.replace(re, '');
	re = new RegExp('' + escapeRegExp('<head>') + '.+' + escapeRegExp('</head>') + '', 'g');
	text = text.replace(re, '');

	re = new RegExp('' + escapeRegExp('<td') + '', 'g');
	text = text.replace(re, '\n\<td');
	re = new RegExp('' + escapeRegExp('</tr>') + '', 'g');
	text = text.replace(re, '\n\<\/tr\>');
	re = new RegExp('' + escapeRegExp('<tr') + '', 'g');
	text = text.replace(re, '\n\<tr');

	var tmp = text.split("\n");
	var re1 = new RegExp('' + escapeRegExp('<td t=') + '.+\"\>', 'g');
	var re2 = new RegExp('' + escapeRegExp('<tr') + '.+\"\>', 'g');
	var re3 = new RegExp('' + escapeRegExp('<td>') + '', 'g');
	var te1 = escapeRegExp('<td>');
	var te2 = escapeRegExp('');
	var i = 0;
	for (i = 0; i < tmp.length; i++) {
		tmp[i] = tmp[i].replace(re1, te1);
		tmp[i] = tmp[i].replace(re2, te2);
		tmp[i] = tmp[i].replace(re3, te2);
	}
	text = [];
	for (i = 0; i < tmp.length; i++) {
		text += tmp[i] + "\n";
	}
	re = new RegExp('' + escapeRegExp('</td>') + '\n', 'g');
	text = text.replace(re, '\t');
	re = new RegExp('' + escapeRegExp('</tr>') + '\n', 'g');
	text = text.replace(re, '\n');
	re = new RegExp('' + escapeRegExp('<tr>') + '\n', 'g');
	text = text.replace(re, '\n');
	re = new RegExp('\n' + '\n', 'g');
	text = text.replace(re, '\n');
	re = new RegExp('' + escapeRegExp('<html><body><table>') + '\n', 'g');
	text = text.replace(re, '');
	re = new RegExp('' + escapeRegExp('</tr></table></body></html>') + '.*', 'g');
	text = text.replace(re, '');

	tmpfile = {
		content: text,
		file: fname
	};
	ProcessSingle(0);
	FinishFiles();
}

function readexcel(file) {
	// open Excel XLSX file and format (tab separated)
	var reader = new FileReader();

	reader.onload = function() {
		var data = new Uint8Array(reader.result);
		try {
			excelwb = XLSX.read(data, {
				type: 'array'
			});
		} catch (err) {}
		p1 = perfnow();
		// if excel workbook has more than 1 worksheet create selection
		if (excelwb.SheetNames.length > 1) {
			var str = "";
			str += "<select id='IDexcelwb' onchange='parsexcel()'>\n";
			str += "<option value='-'> Select Worksheet </option>";
			for (var i = 0; i < excelwb.SheetNames.length; i++) {
				str += "<option value='" + i + "'> " + excelwb.SheetNames[i] + " </option>";
			}
			str += "</select>";
			document.getElementById('IDload').innerHTML = "" + SAPlogo(100, 50) + " Excel File: " + filelist[0].name + " - " + str;
			document.getElementById('IDdetail').innerHTML = "";
			document.getElementById('ID(C)').innerHTML = "";
		} else {
			parsexcel();
		}

	};
	reader.readAsArrayBuffer(filelist[0]);
}

function charCount(s, c) {
	// count characters in string
	var result = 0,
		i = 0;
	for (i; i < s.length; i++)
		if (s[i] == c) result++;
	return result;
}

function escapeRegExp(string) {
	// escape special characters
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function readfile(file, numtotal, filenum) {
	// read selected input file
	var reader = new FileReader();
	reader.onload = function() {

    tmpfile = {
			content: reader.result,
			fname: file.name
		};
		// infile[filecnt] = {
		// 	content: reader.result,
		// 	fname: file.name
		// };
		if (tmpfile.content.includes('DataAnalysisContainer')) {
			var container = JSON.parse(tmpfile.content);
			parhst[ppt] = container.config;
			data = container.gdata;
			header = container.ghead;
			parameters();
			DAC = true;
			return;
		}
		ProcessSingle(filecnt);
		filecnt += 1;
		if (filecnt == numtotal) {
		  FinishFiles();
			infile = null;
			tmpfile = null;
		}
	};
	reader.readAsText(file, "UTF-8");
}

function update() {
	//	read textarea and update preview
	infile = [];
	dprev = document.getElementById('IDcheckpreview').checked;
	tmpfile = {
		content: document.getElementById('IDtextarea').value,
		fname: ''
	};
	if (tmpfile.content == "") return;
	document.getElementById('IDdata').style.display = "none";
	document.getElementById("IDbutupd").style.display = "none";
	prephd = true;
	detect = true;
	ProcessSingle(0);
	FinishFiles()
	if (data.length == 0) {
		document.getElementById('IDdata').style.display = "inline-block";
		document.getElementById("IDbutupd").style.display = "inline-block";
		alert("Please Review Data - no Header line ?");
	}
}

function prepexp() {
	// show imported data in textarea for export to clipboard
	document.getElementById('IDload').innerHTML = "" + SAPlogo(100, 50) + " ";
	document.getElementById('IDload').innerHTML += "<button onclick='copy()'>Copy</button> <button onclick='parameters()'>Graphic</button><br><br>";
	document.getElementById('IDload').innerHTML += "<textarea id='IDtextarea' rows='30' cols='300' style='tabSize:30; font-family:Courier; font-size:10px; color:#000044'  ></textarea><br><br>";
	document.title = 'Export Data';
	document.getElementById("IDhst").style.display = "none";
	document.getElementById("IDgrp").style.display = "none";
	document.getElementById("IDgraphic").style.display = "none";

	txtarea = [];
	var n = 0;
	var i = 0;
	for (n = 0; n < header.length; n++) {
		txtarea += header[n][0] + "\t";
	}
	txtarea += "\n";
	for (n = 0; n < data.length; n++) {
		for (i = 0; i < data[n].length; i++) {
			txtarea += data[n][i] + "\t";
		}
		txtarea += "\n";
	}
	document.getElementById('IDtextarea').value = txtarea;
	displaymode = "";
}

function settitle() {
	addhist();
	if (parhst[ppt].gtitle == "") parhst[ppt].gtitle = tmptl;
	parhst[ppt].gtitle = prompt("Enter Chart Title:", parhst[ppt].gtitle);
	parhst[ppt].xtitle = prompt("Enter Title for X-Axis:", parhst[ppt].xtitle);
	parhst[ppt].ytitle = prompt("Enter Title for Y-Axis:", parhst[ppt].ytitle);
	if (parhst[ppt].gtitle == null) parhst[ppt].gtitle = "";
	if (parhst[ppt].xtitle == null) parhst[ppt].xtitle = "";
	if (parhst[ppt].ytitle == null) parhst[ppt].ytitle = "";
	parameters();
	graphic();
}

function expvdat() {
	// show displayed data in textarea for export to clipboard
	document.getElementById('IDload').innerHTML = "" + SAPlogo(100, 50) + " ";
	document.getElementById('IDload').innerHTML += "<button onclick='copy()'>Copy</button> <button onclick='dnlexport()'>Download</button> <button onclick='parameters()'>Graphic</button><br><br>";
	document.getElementById('IDload').innerHTML += "<textarea id='IDtextarea' rows='30' cols='300' style='tabSize:30; font-family:Courier; font-size:10px; color:#000044'  ></textarea><br><br>";
	document.title = 'Export Data';
	document.getElementById("IDhst").style.display = "none";
	document.getElementById("IDgrp").style.display = "none";
	document.getElementById("IDgraphic").style.display = "none";

	start = true;

	var y1 = parseInt(parhst[ppt].sely1);
	var y2 = parseInt(parhst[ppt].sely2);
	var y3 = parseInt(parhst[ppt].sely3);
	var y4 = parseInt(parhst[ppt].sely4);

	var precision = 0;
	if (parhst[ppt].sely1 !== "") {
		if (header[y1][2] > precision) precision = header[y1][2];
	}
	if (parhst[ppt].sely2 !== "") {
		if (header[y2][2] > precision) precision = header[y1][2];
	}
	if (parhst[ppt].sely3 !== "") {
		if (header[y3][2] > precision) precision = header[y1][2];
	}
	if (parhst[ppt].sely4 !== "") {
		if (header[y4][2] > precision) precision = header[y1][2];
	}

	txtarea = [];
	txtarea = "Index\tStack\tX-Value\tY1\tY2\tY3\tY4\tC\n";
	var n = 0;
	for (n = 0; n < vdat.length; n++) {
		if (!isNaN(vdat[n].y1)) vdat[n].y1 = vdat[n].y1.toPrecision(precision);
		if (!isNaN(vdat[n].y2)) vdat[n].y2 = vdat[n].y2.toPrecision(precision);
		if (!isNaN(vdat[n].y3)) vdat[n].y3 = vdat[n].y3.toPrecision(precision);
		if (!isNaN(vdat[n].y4)) vdat[n].y4 = vdat[n].y4.toPrecision(precision);
		txtarea += n + "\t" + vdat[n].s + "\t" + vdat[n].x + "\t" + vdat[n].y1 + "\t" + vdat[n].y2 + "\t" + vdat[n].y3 + "\t" + vdat[n].y4 + "\t" + vdat[n].c + "\n";
	}
	document.getElementById('IDtextarea').value = txtarea;
	displaymode = "";
}

function pad(num, size) {
	// add leading zeros to number
	var s = "000000000000000" + num;
	return s.substr(s.length - size);
}

function identify(content, fname = "") {
	// identify and parse non-column separated file content (NIPING/MHTML/NMON/TREX/VMSTAT/SAR)
	var text = content;
	var date = "";
	var ucnt = 0;
	var i = 0;
	var tmp = [];
	var output = "Date\tTime\tResp (ms)\n";
	var line = [];
	var month = "";
	var year = "";
	var day = "";
	var time = "";
	var start = false;

	if (content.includes("MIME-Version")) {
		// MHTML
		var re = new RegExp('' + '', 'g');
		text = text.replace(/(\r)/gm, "");
		text = text.replace(/(\n)/gm, "");
		re = new RegExp('' + escapeRegExp('<style>') + '.+' + escapeRegExp('</style>') + '', 'g');
		text = text.replace(re, '');
		re = new RegExp('' + escapeRegExp('<head>') + '.+' + escapeRegExp('</head>') + '', 'g');
		text = text.replace(re, '');

		re = new RegExp('' + escapeRegExp('<td') + '', 'g');
		text = text.replace(re, '\n\<td');
		re = new RegExp('' + escapeRegExp('</tr>') + '', 'g');
		text = text.replace(re, '\n\<\/tr\>');
		re = new RegExp('' + escapeRegExp('<tr') + '', 'g');
		text = text.replace(re, '\n\<tr');

		tmp = text.split("\n");
		var re1 = new RegExp('' + escapeRegExp('<td class') + '.+\"\>', 'g');
		var re2 = new RegExp('' + escapeRegExp('<tr') + '.+\"\>', 'g');
		var re3 = new RegExp('' + escapeRegExp('<td>') + '', 'g');
		var te1 = escapeRegExp('<td>');
		var te2 = escapeRegExp('');
		for (i = 0; i < tmp.length; i++) {
			tmp[i] = tmp[i].replace(re1, te1);
			tmp[i] = tmp[i].replace(re2, te2);
			tmp[i] = tmp[i].replace(re3, '');
		}
		text = [];
		for (i = 1; i < tmp.length; i++) {
			text += tmp[i] + "\n";
		}
		re = new RegExp('' + escapeRegExp('</td>') + '\n', 'g');
		text = text.replace(re, '\t');
		re = new RegExp('' + escapeRegExp('</tr>') + '\n\n', 'g');
		text = text.replace(re, '\n');
		re = new RegExp('' + escapeRegExp('</tr></table></body></html>') + '.+', 'g');
		text = text.replace(re, '');
		return text;

	} else if (content.includes("swap") && content.includes("r b w") && content.includes("kthr")) {
		// VMSTAT		
		if (typeof identify.inpd == 'undefined') {
			identify.inpd = "";
		}
		tmp = content.split("\n");

		date = "";
		start = false;

		sspace = true;

		for (i = 0; i < tmp.length; i++) {

			if (start == false) {
				if (tmp[i].includes("started")) {
					line = tmp[i].split(" ");
					switch (line[1]) {
						case "Jan":
							month = "01";
							break;
						case "Feb":
							month = "02";
							break;
						case "Mar":
							month = "03";
							break;
						case "Apr":
							month = "04";
							break;
						case "May":
							month = "05";
							break;
						case "Jun":
							month = "06";
							break;
						case "Jul":
							month = "07";
							break;
						case "Aug":
							month = "08";
							break;
						case "Sep":
							month = "09";
							break;
						case "Oct":
							month = "10";
							break;
						case "Nov":
							month = "11";
							break;
						case "Dec":
							month = "12";
							break;
					}
					date = line[6] + "-" + month + "-" + pad(line[3], 2);
				}
				if (tmp[i].includes("r b w")) {
					text = tmp[i];
					if (date == "")
						while (true) {
							identify.inpd = date = prompt("Enter Date (YYYY-MM-DD) - File: " + fname, identify.inpd);

							var rg = new RegExp(/(\d{4})-(\d{2})-(\d{2})/);
							if (rg.test(date)) break;
						}
					text = "Date " + "Time " + text.replace(/(\d\d:\d\d:\d\d)\s/, "") + "\n";
					// r b w   swap  free  re  mf pi po fr de sr lf vc vc vc   in   sy   cs us sy id
					text = text.replace("r b w ", "Threads.queued Thread.blocked LWPs.swapped ");
					text = text.replace("re  mf ", "Pages.recl. Page.faults ");
					text = text.replace("swap ", "Av.Swap.Space ");
					text = text.replace("free ", "FreeList ");
					text = text.replace("pi po fr ", "kB(in) kB(out) kB(freed) ");
					text = text.replace("de sr ", "Ant.mem Pages.scanned ");
					text = text.replace("in   sy   cs ", "Inter.p.sec Sys.Calls Cont.switch ");
					text = text.replace("us sy id", "CPU.Usr CPU.Sys CPU.Idl");

					start = true;
				}
			} else {
				if (tmp[i].includes("r b w")) {} else {
					line = tmp[i].split(" ", 3);
					// check if date changed from 23:59:59 to 00:00:00
					if (line[0] < time) {
						var dn = new Date(date);
						dn.setDate(dn.getDate() + 1);
						var nmm = dn.getUTCMonth() + 1;
						var ndd = dn.getUTCDate();
						var nyy = dn.getUTCFullYear();
						date = nyy + "-" + pad(nmm, 2) + "-" + pad(ndd, 2);
					}
					text += date + " " + tmp[i] + "\n";
					time = line[0];
				}
			}
		}
		return text;
	} else if (content.includes("AAA") && content.includes("nmon")) {
		// NMON
		text = text.split("\n");
		var nmon = "";
		var host = "";
		var proc = "";
		var mach = "";
		var n = 0;
		var tab0 = [];
		var tbi0 = 1;
		var tab1 = [];
		var tbi1 = 0;
		var tab2 = [];
		var tbi2 = 0;
		var tab3 = [];
		var tbi3 = 0;
		var tab4 = [];
		var tbi4 = 0;
		var tab5 = [];
		var tbi5 = 0;
		var tab6 = [];
		var tbi6 = 0;
		tab0[0] = "Host\tMachine\tProcessor\tTime\tDate\t";
		for (i = 0; i < text.length; i++) {
			tmp = text[i].split(",");
			switch (tmp[0]) {
				case "CPU_ALL":
					tab1[tbi1] = "";
					for (n = 0; n < tmp.length; n++) {
						if (n < 2) continue;
						if (tbi1 == 0) tmp[n] = "CPU " + tmp[n];
						tab1[tbi1] += tmp[n] + "\t";
					}
					tbi1 += 1;
					break;
				case "MEM":
					tab2[tbi2] = "";
					for (n = 0; n < tmp.length; n++) {
						tmp[n] = tmp[n].replace("Size of the Compressed pool(MB)", "Cmpr.Pool(MB)");
						tmp[n] = tmp[n].replace("Size of true memory(MB)", "True Mem.(MB)");
						tmp[n] = tmp[n].replace("Expanded memory size(MB)", "Exp.Mem.(MB)");
						tmp[n] = tmp[n].replace("Size of the Uncompressed pool(MB)", "UnCmpr.Pool(MB)");
						if (n < 2) continue;
						if (n > 7) continue;
						if (tbi2 == 0) tmp[n] = "MEM " + tmp[n];
						tab2[tbi2] += tmp[n] + "\t";
					}
					tbi2 += 1;
					break;
				case "MEMNEW":
					tab3[tbi3] = "";
					for (n = 0; n < tmp.length; n++) {
						tmp[n] = tmp[n].replace("Compressed Pool", "Cmpr.Pool");
						if (n < 2) continue;
						if (n > 7) continue;
						if (tbi3 == 0) tmp[n] = "MEM " + tmp[n];
						tab3[tbi3] += tmp[n] + "\t";
					}
					tbi3 += 1;
					break;
				case "PROC":
					tab4[tbi4] = "";
					for (n = 0; n < tmp.length; n++) {
						if (n < 2 || n > 7) continue;
						if (tbi4 == 0) tmp[n] = "PROC " + tmp[n];
						tab4[tbi4] += tmp[n] + "\t";
					}
					tbi4 += 1;
					break;
				case "LPAR":
					tab5[tbi5] = "";
					for (n = 0; n < tmp.length; n++) {
						if (n < 2 || n > 12) continue;
						if (tbi5 == 0) tmp[n] = "LPAR " + tmp[n];
						tab5[tbi5] += tmp[n] + "\t";
					}
					tbi5 += 1;
					break;
				case "PAGE":
					tab6[tbi6] = "";
					for (n = 0; n < tmp.length; n++) {
						if (n < 2 || n > 4) continue;
						if (tbi6 == 0) tmp[n] = "PAGE " + tmp[n];
						tab6[tbi6] += tmp[n] + "\t";
					}
					tbi6 += 1;
					break;
				case "AAA":
					if (tmp[1] == "host") {
						host = tmp[2];
					}
					break;
				case "BBBP":
					if (tmp[2] == "lsconf") {
						if (tmp.length > 3) {
							var cfg = tmp[3].replace(/\"/g, "").split(":");
							if (cfg[0] == "System Model") mach = cfg[1] + " " + tmp[4].replace(/\"/g, "");
							if (cfg[0] == "Machine Serial Number") mach += " (" + cfg[1].trim() + ")";
							if (cfg[0] == "Processor Implementation Mode") proc = cfg[1];
							if (cfg[0] == "Number Of Processors") proc += " (# " + cfg[1] + ")";
							if (cfg[0] == "Processor Clock Speed") proc += " - " + cfg[1];
						}
					}
					break;
				case "ZZZZ":
					tab0[tbi0] = host + "\t";
					tab0[tbi0] += mach + "\t";
					tab0[tbi0] += proc + "\t";
					for (n = 0; n < tmp.length; n++) {
						if (n < 2) continue;
						if (n == 3) {
							var dt = tmp[n].split("-");
							switch (dt[1]) {
								case "JAN":
									month = "01";
									break;
								case "FEB":
									month = "02";
									break;
								case "MAR":
									month = "03";
									break;
								case "APR":
									month = "04";
									break;
								case "MAY":
									month = "05";
									break;
								case "JUN":
									month = "06";
									break;
								case "JUL":
									month = "07";
									break;
								case "AUG":
									month = "08";
									break;
								case "SEP":
									month = "09";
									break;
								case "OCT":
									month = "10";
									break;
								case "NOV":
									month = "11";
									break;
								case "DEC":
									month = "12";
									break;
							}
							tmp[n] = dt[2] + "." + month + "." + dt[0];
						}
						tab0[tbi0] += tmp[n] + "\t";
					}
					tbi0 += 1;
					break;
			}
		}
		for (i = 0; i < tab1.length; i++) {
			nmon += tab0[i] + tab1[i] + tab2[i] + tab3[i] + tab4[i] + tab5[i] + tab6[i] + "\n";
		}
		return nmon;
	} else if (content.startsWith("Linux")) {
		// SAR		
		if (typeof identify.inpd == 'undefined') {
			identify.inpd = "";
		}

		tmp = content;
		tmp = tmp.replace(/ /g, '\t');
		tmp = tmp.replace(/\t+/g, '\t');
		tmp = tmp.replace(/\r\n/g, '\n');
		tmp = tmp.split("\n");
		month = year = day = date = time = "";
		start = false;
		var rd = new RegExp(/(\d{2})\/(\d{2})\/(\d{4})/);
		var rt = new RegExp(/(\d{2}):(\d{2}):(\d{2})/);

		var l0 = tmp[0].split("\t");
		var l3 = tmp[2].split("\t");
		if (tmp[0].includes("Linux") && tmp[1] == "" && rd.test(l0[3]) && rt.test(l3[0])) {
			// now we have identified the SAR structure
			var dd = l0[3].split("/");
			// convert MM/DD/YYYY to YYYY-MM-DD
			date = dd[2] + "-" + dd[0] + "-" + dd[1];
			tmp[2] = "Date" + "\t" + "Time" + "\t" + tmp[2].replace(/(\d\d:\d\d:\d\d)\s/, "").replace(/(AM\t)/, "").replace(/(PM\t)/, "");
			for (i = 3; i < tmp.length; i++) {
				if (tmp[i].includes("Linux")) {
					// update date
					l0 = tmp[i].split("\t");
					dd = l0[3].split("/");
					date = dd[2] + "-" + dd[0] + "-" + dd[1];
				}
				line = tmp[i].split("\t");
				// calculate time in 24h format
				var tt = line[0].split(":");
				var HH = parseInt(tt[0]);
				var MM = tt[1];
				var SS = tt[2];
				if (line[1] == 'PM') HH = HH + 12;
				time = pad(HH, 2) + ":" + MM + ":" + SS;
				text = date + "\t" + time + "\t";
				for (var x = 2; x < line.length; x++) {
					text += line[x] + "\t";
				}
				tmp[i] = text;
			}
			text = "";
			for (i = 2; i < tmp.length; i++) {
				text = text + tmp[i] + "\n";
			}
			text = text.replace(/\t\n/g, "\n");
			return text;
		}
	} else if (content.includes("host;tenant;time;searchCount")) {
		// TREX
		text = text.split("\n");
		for (i = 0; i < text.length; i++) {
			output += " " + text[i] + "\n";
		}
		parhst[ppt].selx1 = 1;
		trex = true;
		colsep = ";";
		return output;
	} else if (content.includes("connect to server o.k.")) {
		// NIPING
		text = text.replace(/(\r\n\r\n|\n\n|\r\r|\r\n)/gm, "\n"); //  replace multiple line breaks with single line break
		text = text.replace(/(\r)/gm, "\n");
		text = text.replace(/( ms\n)/gm, "\n"); //  remove ms
		text = text.replace(/(connect to server o.k.\n)/gm, ""); //  remove connect to server o.k.
		text = text.replace(/( 20\d\d)\n/gm, "$1"); //  remove year + line break after date 
		text = text.split("\n");
		for (i = 0; i < text.length; i++) {
			if (text[i] == "") continue;
			var patt = /\w\w\w \w\w\w /;

			if (patt.test(text[i])) {
				tmp = text[i].split(" ");
				date = tmp[0] + " " + tmp[1] + " " + tmp[2] + " " + tmp[3] + " " + tmp[4];
				ucnt = 0;
			} else {
				text[i] = date + text[i];
				ucnt += 1;
			}
			text[i] = text[i].replace(/ +/g, ' '); // remove duplicate space
			text[i] = text[i].replace(/ /g, '|');

			line = text[i].split("|");
			month = "";
			switch (line[1]) {
				case "Jan":
					month = "01";
					break;
				case "Feb":
					month = "02";
					break;
				case "Mar":
					month = "03";
					break;
				case "Apr":
					month = "04";
					break;
				case "May":
					month = "05";
					break;
				case "Jun":
					month = "06";
					break;
				case "Jul":
					month = "07";
					break;
				case "Aug":
					month = "08";
					break;
				case "Sep":
					month = "09";
					break;
				case "Oct":
					month = "10";
					break;
				case "Nov":
					month = "11";
					break;
				case "Dec":
					month = "12";
					break;
				default:
					month = line[1];
					parhst[ppt].grtype = 'scatter';
			}

			var num = 0;
			num = parseFloat(line[6]);
			if (num > 0) {
				output += line[4] + "." + month + "." + pad(line[2], 2) + "\t" + line[3] + "\t" + line[6];
				output += "\n";
			}
		}
		return output;
	} else {
		return content;
	}
}

function findhdr(lookup) {
	// find matching header column
	var src = lookup.split(" ");
	var i = 0;
	var n = 0;
	for (n = 1; n < header.length; n++) {
		var found = true;
		var tmp = header[n][0].replace(/ /g, '').toLowerCase();
		for (i = 0; i < src.length; i++) {
			found = found && tmp.includes(src[i].toLowerCase());
		}
		if (found) {
			hdrpos = n;
			return true;
		}
	}
	return false;
}

function checkhdr() {
	// pre-select fields for X-Axis, Y-Axis
	// x-Axis = Index
	parhst[ppt].selx1 = 1;
	// y-Axis
	hdrpos = 0;
	if (findhdr("CPU usr") || findhdr("cpu user") || findhdr("%user") || findhdr("User%") || findhdr("cpuUsed") || findhdr("USR_TOTAL")) {
		parhst[ppt].colsc[0][0] = 65;
		parhst[ppt].colsc[1][0] = 80;
		parhst[ppt].colsc[2][0] = 90;
		parhst[ppt].sely1 = hdrpos;
		parhst[ppt].ytmin = "0";
		parhst[ppt].ytmax = "100";
		if (findhdr("cpu sys")) parhst[ppt].sely2 = hdrpos;
		if (findhdr("sys%")) parhst[ppt].sely2 = hdrpos;
		if (findhdr("%system")) parhst[ppt].sely2 = hdrpos;
		if (findhdr("SYS_TOTAL")) parhst[ppt].sely2 = hdrpos;
	} else if (findhdr("cpu")) {
		parhst[ppt].colsc[0][0] = 65;
		parhst[ppt].colsc[1][0] = 80;
		parhst[ppt].colsc[2][0] = 90;
		parhst[ppt].sely1 = hdrpos;
		parhst[ppt].ytmin = "0";
		parhst[ppt].ytmax = "100";
	} else if (findhdr("memory")) {
		parhst[ppt].colsc[0][0] = 0;
		parhst[ppt].colsc[1][0] = 0;
		parhst[ppt].colsc[2][0] = 0;
		parhst[ppt].sely1 = hdrpos;
	} else if (findhdr("mem")) {
		parhst[ppt].colsc[0][0] = 0;
		parhst[ppt].colsc[1][0] = 0;
		parhst[ppt].colsc[2][0] = 0;
		parhst[ppt].sely1 = hdrpos;
	} else if (findhdr("E. Acc DB")) {
		parhst[ppt].colsc[0][0] = 100;
		parhst[ppt].colsc[1][0] = 155;
		parhst[ppt].colsc[2][0] = 200;
		parhst[ppt].grtype = 'scatter';
		parhst[ppt].sely1 = hdrpos;
	} else if (findhdr("Resp (ms)")) {
		parhst[ppt].colsc[0][0] = 0.50;
		parhst[ppt].colsc[1][0] = 0.70;
		parhst[ppt].colsc[2][0] = 1.20;
		parhst[ppt].sely1 = 4;
	}
}

function reprocess() {
	// re-process graphic (go-back button)
	if (DAC) location.reload();

	displaymode = "";
	document.getElementById("IDgraphic").style.display = "none";
	document.getElementById("IDhst").style.display = "none";
	document.getElementById("IDgrp").style.display = "none";
	preview();
}

function ProcessSingle(index) {
 
  document.title = 'loading files ( ' + index + ' / ' + filelist.length +' )';

	txtarea = "";
	var num = 0;
	var hdrempty = false;
	var x = 0;
	var i = 0;
	var n = 0;
	var re = new RegExp('');
	var tmp = 0;
	var text = [];
	var coldel = "";
	var hdend = "";

	// process input files (select header fields, separate data into columns)

	txtarea = "";
	var num = 0;

	var x = 0;
	var i = 0;
	var n = 0;
	var ind = 0;
	var re = new RegExp('');
	var tmp = 0;
	var text = [];
	var coldel = "";
	var hdend = "";
	
	// for (x = 0; x < infile.length; x++) {

		tmpfile.content = identify(tmpfile.content, tmpfile.fname);
		// console.log("File: " + x);

		if (sspace) {
			tmpfile.content = tmpfile.content.replace(/ +/g, '\t');
			colsep = "\t";
		}

		// if column separator = "," then CSV file
		// if (colsep == "," ) {
		if (filelist.length > 0 && filelist[0].name.includes('.csv')) {
			text = CSVToArray(tmpfile.content, colsep);
			coldel = "\t";
		} else {
			text = tmpfile.content.split("\n");
			// detect column separator if empty
			if (colsep == "") {

				if (detect) {
					for (i = 0; i < delim.length; i++) {
						delim[i][0] = 0;
						for (n = 0; n < text.length; n++) {
							re = new RegExp('' + delim[i][1] + '', 'g');
							delim[i][0] += charCount(text[n], delim[i][1]);
							if (n == 20) break;
						}
					}
					detect = false;
				}
				delim.sort((a, b) => b[0] - a[0]);
				coldel = delim[0][1];
			} else {
				coldel = colsep;
			}
		}

		var thl = 0;
		for (i = 0; i < text.length; i++) {
			tmp = charCount(text[i], coldel);
			if (tmp > thl) thl = tmp;
			if (i > 20) break;
		}

		// Prepare Regular expressions
		var re1 = new RegExp('^' + escapeRegExp(coldel) + '\\s+' + escapeRegExp(coldel) + '', 'g');
		var re2 = new RegExp('^' + escapeRegExp(coldel) + '', 'g');
		var re3 = new RegExp('' + escapeRegExp(coldel) + '$', 'g');
		var re4 = new RegExp('\s*' + escapeRegExp(coldel) + '\s*$', 'g');
		var re5 = new RegExp('' + escapeRegExp(coldel) + '', 'g');

		var fln = pad(index, 5);
		var idl = Math.trunc(Math.log10(text.length) + 1);

		for (i = 0; i < text.length; i++) {

			var res = text[i];
			res = res.substring(1, 4);

			if (res == "---" || text[i] == "") continue;

			if (globalhd) {
				// Header 
				if (prephd) {
					globalnum = charCount(text[i], coldel);
					if (globalnum < thl) continue;

					text[i] = text[i].replace(re1, '');
					text[i] = text[i].replace(re2, '');
					text[i] = text[i].replace(re3, '');

					text[i] = "File" + coldel + "Index" + coldel + text[i];

					globalhdend = text[i].slice(Math.trunc(text[i].length / 2));
					var hdrtmp = text[i].split(coldel);
					for (n = 0; n < hdrtmp.length; n++) {
						header[n] = [hdrtmp[n].trim(), ""];
					}

					// check if first line is description or not (numbers)
					for (n = 0; n < header.length; n++) {
						if (header[n][0] == "" || !isNaN(header[n][0])) {
							header[n][0] = "Key" + n;
						}
					}

					text[i] = text[i].replace(re5, "\t");
					thl = charCount(text[i], "\t");
					txtarea += text[i] + "\n";
					prephd = false;
					checkhdr();
				}
				globalhd = false;
			}
			if (!globalhd) {
				// item records
				if (header[1][0] == "") break;
				// if (text[i].includes(header[2][0])) continue;
				if (text[i].includes(globalhdend)) continue;
				// Decimal Notation
				if (decpnt == '.') {
					if (coldel != ',') {
						text[i] = text[i].replace(/,/g, '');
					}
				} else {
					text[i] = text[i].replace(/\./g, '');
					text[i] = text[i].replace(/,/g, '\.');
				}
				var cols = charCount(text[i], coldel);
				if (cols != globalnum) continue;
				text[i] = text[i].replace(re1, '');
				text[i] = text[i].replace(re2, '');
				text[i] = text[i].replace(re4, '');
				text[i] = text[i].replace(re3, '');
				var idx = 'I' + pad(ind, idl);
				if (usefnam) text[i] = "" + tmpfile.fname + coldel + idx + coldel + text[i];
				else text[i] = "F" + fln + coldel + idx + coldel + text[i];
				// text[i] = text[i].replace(re5, "\t");
				// text[i] = text[i].replace(/,/g, "");
				text[i] = text[i].replace(/ /g, "");
				for (var col = charCount(text[i], coldel); col < thl; col++) {
					text[i] = text[i] + coldel;
				}
				// split textline into separate rows
				var tcols = text[i].split(coldel);
				// copy each column to temp array
				dtmp = [];
				for (var cc = 0; cc < tcols.length; cc++) {
					dtmp[cc] = "" + tcols[cc];
				}
				// add row to data array
				data.push("");
				data[data.length - 1] = dtmp.slice(0);
				ind++;
				
			}
		}

    tmpfile = "";

    tcols = null;
    text = null;
		
	// }
}

function FinishFiles() {

	txtarea = "";
	var num = 0;
	var x = 0;
	var i = 0;
	var n = 0;
	var re = new RegExp('');
	var tmp = 0;
	var text = [];
	var coldel = "";
	var hdend = "";

	text = [];
	if (data.length < 3) return;

	if (trex) {
		// process Trex Files
		for (n = 4; n < header.length; n++) {
			for (i = 0; i < data.length; i++) {
				if (data[i][n][0] == "<") {
					// subtract from previous record
					data[i][n] = parseInt(data[i][n].substr(1));
					data[i][n] = parseInt(data[i - 1][n]) - data[i][n];
				} else if (data[i][n][0] == ">") {
					// add to previous record
					data[i][n] = parseInt(data[i][n].substr(1));
					data[i][n] = parseInt(data[i - 1][n]) + data[i][n];
				} else if (data[i][n] == "") {
					// copy previous record
					data[i][n] = parseInt(data[i - 1][n]);
				} else {
					// new value
					data[i][n] = parseInt(data[i][n]);
				}
			}
		}
		// Add new column for date
		var tmphdr = ["Date", "d"];
		header.splice(4, 0, tmphdr);
		for (i = 0; i < data.length; i++) {
			data[i].splice(4, 0, "");
		}
		for (i = 0; i < data.length; i++) {
			// convert time from epoch (seconds since Jan. 1st 1970 to Date/Time)
			var dt = new Date(0);
			dt.setUTCSeconds(data[i][5]);
			var mm = dt.getMonth() + 1;
			var dd = dt.getDay();
			var yyyy = dt.getFullYear();
			var HH = dt.getHours();
			var MM = dt.getMinutes();
			var SS = dt.getSeconds();
			data[i][4] = "" + yyyy + "-" + pad(mm, 2) + "-" + pad(dd, 2);
			data[i][5] = "" + pad(HH, 2) + ":" + pad(MM, 2) + ":" + pad(SS, 2);
		}
		checkhdr();
	}

	var regex = new RegExp('');

	// try to find Date Format
	var dtfound = false;
	if (parhst[ppt].datind == "") {
		for (n = 0; n < data.length; n++) {
			for (var t = 0; t < data[n].length; t++) {
				for (var d = 0; d < dtfrm.length; d++) {
					regex = dtfrm[d][2];
					if (regex.test(data[n][t])) {
						dtfound = true;
						parhst[ppt].datind = "" + d;
						break;
					}
				}
				if (dtfound) break;
			}
			if (n == 10 || dtfound) break;
		}
	}

	headertyp();

	// Default x-axis to date and/or time
	var dnum = "";
	var tnum = "";
	for (n = 0; n < header.length; n++) {
		if (header[n][1] == "d") {
			dnum = n;
			break;
		}
	}
	for (n = 0; n < header.length; n++) {
		if (header[n][1] == "t") {
			tnum = n;
			break;
		}
	}
	if (dnum != "" && tnum != "") {
		parhst[ppt].selx1 = dnum;
		parhst[ppt].selx2 = tnum;
	} else if (dnum != "" && tnum == "") {
		parhst[ppt].selx1 = dnum;
	} else if (dnum == "" && tnum != "") {
		parhst[ppt].selx1 = tnum;
	}

	// Default y-axis
	if (parhst[ppt].sely1 == "") {
		for (n = 2; n < header.length; n++) {
			if (header[n][1] == "n") {
				parhst[ppt].sely1 = n;
				break;
			}
		}
	}
	
	if (dprev) {
		preview();
	} else {
		parameters();
	}


}

function process() {
	// process input files (select header fields, separate data into columns)
	document.title = 'processing data ';
	document.body.style.cursor = "progress";

	detect = true;
	prephd = true;
	start = true;
	header = [];
	data = [];
	displaymode = "";
	
  globalhd = true;
  globalhdend = "";

	txtarea = "";
	var num = 0;
	var x = 0;
	var i = 0;
	var n = 0;
	var re = new RegExp('');
	var tmp = 0;
	var text = [];
	var coldel = "";
	var hdend = "";
	
	for (x = 0; x < infile.length; x++) {
	   tmpfile = infile[x];
	   ProcessSingle(x);
	}
	FinishFiles();

}

function headertyp() {
	var n = 0;
	var i = 0;
	var regex = new RegExp('');

	// check if column is numeric
	for (n = 0; n < header.length; n++) {
		var isnum = true;
		for (i = 0; i < data.length; i++) {
			if (isNaN(data[i][n])) {
				isnum = false;
				break;
			}
			if (i > 20) break;
		}
		if (isnum) header[n][1] = "n";
		else header[n][1] = "-";
	}

	// check if column is time
	for (n = 0; n < header.length; n++) {
		var istime = false;
		var updtim = false;
		for (i = 0; i < data.length; i++) {

			// test time formats HH:MM:SS or HH:MM
			regex = /(\d{1,2}):(\d{2}):(\d{2})/;
			if (regex.test(data[i][n])) {
				istime = true;
			} else {
				regex = /(\d{1,2}):(\d{2})/;
				if (regex.test(data[i][n])) {
					istime = true;
					updtim = true;
				} else {
					istime = false;
					break;
				}
			}
			if (i > 20) break;
		}
		if (updtim) {
			for (i = 0; i < data.length; i++) {
				data[i][n] = data[i][n] + ":00";
			}
		}
		if (istime) header[n][1] = "t";
	}

	// check if column is date
	for (n = 0; n < header.length; n++) {
		var isdate = false;
		for (i = 0; i < data.length; i++) {
			// test date formats DD.MM.YYYY
			regex = /(\d{4})[\/.-](\d{2})[\/.-](\d{2})/;
			if (regex.test(data[i][n])) {
				isdate = true;
				break;
			}
			regex = /(\d{2})[\/.-](\d{2})[\/.-](\d{4})/;
			if (regex.test(data[i][n])) {
				isdate = true;
				break;
			}
			regex = /(\d{2})[\/.-](\d{2})[\/.-](\d{2})/;
			if (regex.test(data[i][n])) {
				isdate = true;
				break;
			}
			if (i > 20) break;
		}
		if (isdate) header[n][1] = "d";
	}

	// Field length
	for (n = 0; n < header.length; n++) {
		header[n][2] = 0;
		for (i = 0; i < 100; i++) {
			var ind = Math.trunc(Math.random() * (data.length - 1));
			if (data[ind][n].length > header[n][2]) {
				header[n][2] = data[ind][n].length;
			}
		}
	}
}

function preview() {
	// +++++ prepare preview table output +++++		

	var n = 0;
	var i = 0;
	
	start = true;
	
	if ( data.length < 5) return;

	var dtf = "";
	dtf += "<select id='IDDTF' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='seldatfrm()'>\n";
	for (n = 0; n < dtfrm.length; n++) {
		if (n == parhst[ppt].datind) {
			dtf += "<option value='" + dtfrm[n][0] + "' selected > " + dtfrm[n][1] + " </option>";
		} else {
			dtf += "<option value='" + dtfrm[n][0] + "'> " + dtfrm[n][1] + " </option>";
		}
	}
	dtf += "</select>";

	// Style definitions	
	if (!previewstyle) {
		var vstyle = document.createElement('style');
		vstyle.innerHTML = '';
		vstyle.id = 'STYLEpreview';
		vstyle.innerHTML += " td { padding-right: 0.2em; padding-left: 0.2em; }";
		document.body.appendChild(vstyle);
		previewstyle = true;
	}

	var str = "<small>Review data, if required edit header description(s), then press <i><b>Graphic</b></i> button to display the histogram & scatterplot - Select Date Format: " + dtf + "  - Use: ";

	if (usefnam) {
		str += "<button onclick='toggleusefnam()' title='Toggle File Name / File count' >File Count</button>";
	} else {
		str += "<button onclick='toggleusefnam()' title='Toggle File Name / File count' >File Name</button>";
	}
	str += "</small><br>";

	str += "<font color='#444488' style='font-size: 10px;'>";
	str += "<table><tr>";
	for (n = 0; n < header.length; n++) {
		if (header[n[0]] == "") continue;
		str += "<td><input id='IDhdr" + n + "' style='font-size:12px;' font-weight:bold;  onblur='bhdr()' onfocus='shdr()' onchange='readhdr()' size = '8' type='text' name='hdr' value='" + header[n][0] + "'></td>";
		// str += "<td>" + header[n] + "</td>";
	}
	str += "</tr>";
	for (n = 0; n < data.length; n++) {
		str += "<tr>";
		for (i = 0; i < data[n].length; i++) {
			// if (col[i] == "") continue;
			str += "<td>" + data[n][i] + "</td>";
		}
		if (n > 25) break;
		str += "</tr>";
	}
	str += "<tr><td colspan=" + data[n-1].length + "> ... </td></tr>";
	for (n = (data.length - 5); n < data.length; n++) {
		str += "<tr>";
		for (i = 0; i < data[n].length; i++) {
			// if (col[i] == "") continue;
			str += "<td>" + data[n][i] + "</td>";
		}
		str += "</tr>";
	}
	str += "</table>";
	str += "</font>";
	document.getElementById('IDoutput').innerHTML = "<button id='IDbutret' style='color:gray' onclick='goback()'><i>go back</i></button>";
	document.getElementById('IDoutput').innerHTML += "<button id='IDgrpic' onclick='parameters()'><b>Graphic</b></button><br><br>";

	document.getElementById('IDpreview').innerHTML = str;
	document.getElementById('IDpreview').innerHTML += "<div style='overflow: hidden; position: relative;'><div style='position: absolute; height: 10px; width: 10px;  right: -100px; top: -100px;'><textarea id='IDexport' rows='1' cols='1' style='tabSize:30; font-family:Courier; font-size:10px; color:#000044'  ></textarea></div><div>";
	document.getElementById('IDpreview').innerHTML += "<br><button onclick='exppre()'>Copy to Clipboard</button>";

	document.getElementById('IDpreview').innerHTML += " <small>   replace: </small><input id='IDFIND' size='30' >";
	document.getElementById('IDpreview').innerHTML += " <small>with: </small><input id='IDREPL' size='30' >";
	document.getElementById('IDpreview').innerHTML += "<button onclick='findrepl()' title='find and replace in non-numeric fields' >Replace</button>";
	document.getElementById('IDpreview').innerHTML += "<button onclick='splithdr()' title='Split Column' >Split</button>";
	document.getElementById('IDpreview').innerHTML += "<div id='IDdel' style='display: inline-block;'></div><br><br> ";

	document.getElementById('IDload').innerHTML = SAPlogo(100, 50);
	document.getElementById('ID(C)').innerHTML = "";

	p1 = perfnow();
	var dt = (p1 - p0).toFixed(2);
	document.getElementById('IDdetail').innerHTML = " <small> Runtime: " + dt + " ms  -- " + data.length + " records loaded </small>";
	document.title = 'data preview ready';
	document.body.style.cursor = "default";

}

function toggleusefnam() {
	// Filename or File counter
	if (usefnam) usefnam = false;
	else usefnam = true;
	var fileind = 0;
	for (var n = 0; n < data.length; n++) {
	  if (usefnam) { 
	    fileind = parseInt(data[n][0].substring(1,6));
	    data[n][0] = filelist[fileind].name;
	  } else {
	    for (var i = 0; i < filelist.length; i++) {
	      if (data[n][0] == filelist[i].name) {
	        var fln = pad(i, 5);
	        data[n][0] = "F" + fln;
	      }
	    }
	  }
	}
	preview();
}

function shdr(e) {
	var ID = event.target.id;
	selhdr = parseInt(ID.replace("IDhdr", ""));
	document.getElementById('IDdel').innerHTML = "<button onclick='dtdelete(event)' title='Delete Selected Values' >Delete Values</button>";
}

function bhdr(e) {
	setTimeout(function() {
		var actel = document.activeElement;
		if (actel.id.includes("IDhdr")) return;
		document.getElementById('IDdel').innerHTML = "";
		selhdr = "";
	}, 100);
}

function findrepl() {
	var find = document.getElementById('IDFIND').value;
	var repl = document.getElementById('IDREPL').value;
	for (var n = 0; n < data.length; n++) {
		for (var i = 0; i < data[n].length; i++) {
			if (isNaN(data[n][i])) data[n][i] = data[n][i].replace(find, repl);
		}
	}
	preview();
}

function exppre() {
	// copy data into textarea
	var txtarea = [];
	var n = 0;
	var i = 0;
	for (n = 0; n < header.length; n++) {
		txtarea += header[n][0] + "\t";
	}
	txtarea += "\n";
	for (n = 0; n < data.length; n++) {
		for (i = 0; i < data[n].length; i++) {
			txtarea += data[n][i] + "\t";
		}
		txtarea += "\n";
	}
	document.getElementById('IDexport').value = txtarea;

	// alert message
	alert('Data will be selected - please wait a few seconds... ');

	document.title = 'Data export in progress - please be patient... ';
	// copy data from textarea to clipboard
	textarea = document.getElementById("IDexport");
	textarea.select();
	document.execCommand("copy");
	alert('Data copied to clipboard - use Ctrl-V to paste');
	document.title = 'Data export successfull';
	document.getElementById("IDexport").remove();
}

function seldatfrm() {
	// read selected date format
	parhst[ppt].datind = document.getElementById("IDDTF").value;
}

function goback() {
	// reload (go-back from 2nd screen)
	location.reload();
}

function readhdr() {
	// update header from preview 
	for (var n = 0; n < header.length; n++) {
		var hdrid = "IDhdr" + n;
		header[n][0] = document.getElementById(hdrid).value;
	}
}

function dtdelete(e) {
	var cc = 0;
	var val = "";
	var n = 0;
	var cnt = 0;

	if (selhdr == "") return;
	cc = parseInt(selhdr);

	while (true) {
		// get value
		val = prompt("Specify Value to delete for column\n\n" + header[cc][0] + " = ", "");
		if (val == null) return;

		cnt = 0;
		for (n = 0; n < data.length; n++) {
			if (data[n][cc] == val) {
				cnt = cnt + 1;
			}
		}
		if (cnt == 0) {
			alert("no matching records found");
		} else {
			break;
		}
	}

	var conf = confirm("Found " + cnt + " records - continue deleting those records?");
	if (conf !== true) {
		alert("deletion canceled");
		return;
	}

	p0 = perfnow();

	// delete Records
	document.title = 'deleting records ... ';
	document.getElementById('IDpreview').innerHTML = "";
	document.getElementById('IDdetail').innerHTML = "";
	document.getElementById('ID(C)').innerHTML = "";
	document.body.style.cursor = "progress";

	setTimeout(function() {

		var n = 0;

		// delete records from array
		while (true) {
			if (data[n][cc] == val) {
				data[n] = data[data.length - 1];
				data.pop();
			} else {
				n = n + 1;
			}
			if (n > data.length - 1) break;
		}

		// re-create output 
		data.sort(function(a, b) {
        var t1 = a[0] + a[1];
        var t2 = b[0] + b[1];
		  return t1 < t2 ? -1 : t1 > t2 ? 1 : 0;
	  });

		// re-process
		preview();
	}, 25);

}

function splithdr() {
	var col = "";
	var cc = 0;
	var pos = "";
	var pp = 0;
	var ll = 0;
	while (true) {
		// get column index
		while (true) {
			col = prompt("Specify column number to split (column '" + header[2][0] + "' = 2):", "");
			if (col == "" || col == null) return;
			cc = parseInt(col);
			if (cc > 1 && cc < header.length) break;
		}
		// get position
		while (true) {
			pos = prompt("Split column (" + header[cc][0] + ") - specify position (from left):", "");
			pp = parseInt(pos);
			if (pos == "" || pos == null) return;
			if (pp > 0) break;
		}
		// confirm split
		ll = data[0][cc].length;
		var con = confirm("Confirm Result: " + data[0][cc].substring(0, pp) + " -- " + data[0][cc].substring(pp, ll) + " ");
		if (con) break;
	}
	cc += 1;

	if (cc < 1 || col == "") return;
	if (pp < 1 || pos == "") return;
	// create new entry in header table
	var tmp = ["", "", 0];
	tmp[0] += header[cc - 1][0];
	tmp[1] += header[cc - 1][1];
	tmp[2] += header[cc - 1][2];
	header.splice(cc, 0, tmp);
	header[cc][0] = "Hdr " + hdrs;
	hdrs += 1;
	header[cc][2] = ll - pp;

	// Split all rows
	var ins = "";
	for (var n = 0; n < data.length; n++) {
		data[n].splice(cc, 0, ins);
		ll = data[n][cc - 1].length;
		data[n][cc] = data[n][cc - 1].substring(pp, ll);
		data[n][cc - 1] = data[n][cc - 1].substring(0, pp);
	}

	headertyp();

	// re-create output 
	var text = "";
	for (n = 2; n < header.length; n++) {
		text += header[n][0];
		if (n < header.length - 1) text += "\t";
	}
	text += "\n";
	for (n = 0; n < data.length; n++) {
		for (var i = 2; i < data[n].length; i++) {
			text += data[n][i];
			if (i < data[n].length - 1) text += "\t";
		}
		text += "\n";
	}

	// re-process
	preview();
}

function SAPlogo(pwidth, pheight) {
	// SAP Logo in SVG format
	var str = '';
	str += '<svg ';
	str += '	 xmlns:svg="http://www.w3.org/2000/svg" ';
	str += '	 xmlns="http://www.w3.org/2000/svg" ';
	str += '	 xmlns:xlink="http://www.w3.org/1999/xlink" ';
	str += '	 version="1.1" ';
	str += '	 width="' + pwidth + 'px" ';
	str += '	 height="' + pheight + 'px" ';
	str += '	 viewBox="1 -2 92 47" ';
	str += '	 id="svg5220"> ';
	str += '	<defs ';
	str += '		 id="defs5222"> ';
	str += '		<linearGradient ';
	str += '			 x1="0" ';
	str += '			 y1="0" ';
	str += '			 x2="0.9572" ';
	str += '			 y2="0" ';
	str += '			 id="linearGradient3048" ';
	str += '			 gradientUnits="userSpaceOnUse" ';
	str += '			 gradientTransform="matrix(0,-37.1015,37.1015,0,69.9034,70.5065)" ';
	str += '			 spreadMethod="pad"> ';
	str += '			<stop ';
	str += '			   id="stop3050" ';
	str += '			   style="stop-color:#00b8f1;stop-zopac:1" ';
	str += '			   offset="0" /> ';
	str += '			<stop ';
	str += '			   id="stop3052" ';
	str += '			   style="stop-color:#06a5e5;stop-zopac:1" ';
	str += '			   offset="0.2198" /> ';
	str += '			<stop ';
	str += '			   id="stop3054" ';
	str += '			   style="stop-color:#06a5e5;stop-zopac:1" ';
	str += '			   offset="0.2198" /> ';
	str += '			<stop ';
	str += '			   id="stop3056" ';
	str += '			   style="stop-color:#1870c5;stop-zopac:1" ';
	str += '			   offset="0.7943" /> ';
	str += '			<stop ';
	str += '			   id="stop3058" ';
	str += '			   style="stop-color:#1d61bc;stop-zopac:1" ';
	str += '			   offset="1" /> ';
	str += '		</linearGradient> ';
	str += '		<linearGradient ';
	str += '			 x1="0" ';
	str += '			 y1="0" ';
	str += '			 x2="0.9572" ';
	str += '			 y2="0" ';
	str += '			 id="linearGradient5318" ';
	str += '			 xlink:href="#linearGradient3048" ';
	str += '			 gradientUnits="userSpaceOnUse" ';
	str += '			 gradientTransform="matrix(0,-37.1015,37.1015,0,69.9034,70.5065)" ';
	str += '			 spreadMethod="pad" /> ';
	str += '		<linearGradient ';
	str += '			 x1="0" ';
	str += '			 y1="0" ';
	str += '			 x2="0.9572" ';
	str += '			 y2="0" ';
	str += '			 id="linearGradient5323" ';
	str += '			 xlink:href="#linearGradient3048" ';
	str += '			 gradientUnits="userSpaceOnUse" ';
	str += '			 gradientTransform="matrix(0,-37.1015,37.1015,0,69.9034,70.5065)" ';
	str += '			 spreadMethod="pad" /> ';
	str += '		<linearGradient ';
	str += '			 x1="0" ';
	str += '			 y1="0" ';
	str += '			 x2="0.9572" ';
	str += '			 y2="0" ';
	str += '			 id="linearGradient5331" ';
	str += '			 xlink:href="#linearGradient3048" ';
	str += '			 gradientUnits="userSpaceOnUse" ';
	str += '			 gradientTransform="matrix(0,-37.1015,37.1015,0,69.9034,70.5065)" ';
	str += '			 spreadMethod="pad" /> ';
	str += '		<linearGradient ';
	str += '			 x1="0" ';
	str += '			 y1="0" ';
	str += '			 x2="0.9572" ';
	str += '			 y2="0" ';
	str += '			 id="linearGradient5334" ';
	str += '			 xlink:href="#linearGradient3048" ';
	str += '			 gradientUnits="userSpaceOnUse" ';
	str += '			 gradientTransform="matrix(0,46.3769,46.3769,0,44.859,0.024)" ';
	str += '			 spreadMethod="pad" /> ';
	str += '	</defs> ';
	str += '	<path ';
	str += '		 d="m 0,0 0,44.415 45.371,0 44.41,-44.41 0,0 -89.781,0 z" ';
	str += '		 id="path3060" ';
	str += '		 style="fill:url(#linearGradient5334);fill-zopac:1;stroke:none" /> ';
	str += '	<path ';
	str += '		 d="m 57.4688,39.875 0,3.3125 0.5,0 0,-1.4375 0.5624,0 0.9063,1.4375 0.5625,0 -0.9688,-1.4375 c 0.4841,-0.06 0.875,-0.3415 0.875,-0.9375 0,-0.653 -0.3996,-0.9375 -1.1874,-0.9375 l -1.25,0 z m 0.5,0.4375 0.6874,0 c 0.3381,0 0.7188,0.055 0.7188,0.4687 0,0.5171 -0.3855,0.5626 -0.8125,0.5626 l -0.5937,0 0,-1.0313 z m 0.625,-1.6563 c -1.586,0 -2.9376,1.2221 -2.9376,2.875 0,1.665 1.3515,2.9063 2.9376,2.9063 1.564,0 2.875,-1.2411 2.875,-2.9063 0,-1.6529 -1.311,-2.875 -2.875,-2.875 z m 0,0.4688 c 1.2939,0 2.3124,1.0453 2.3124,2.4062 0,1.3842 -1.0185,2.4063 -2.3124,2.4063 -1.3161,0 -2.375,-1.0221 -2.375,-2.4063 0,-1.3609 1.0589,-2.4062 2.375,-2.4062 z" ';
	str += '		 id="path5384" ';
	str += '		 style="fill:#1870c5;fill-zopac:1;fill-rule:nonzero;stroke:none" /> ';
	str += '	<path ';
	str += '		 d="m 53.797,21.252 -1.946,0 0,-7.117 1.946,0 c 2.598,0 4.666,0.856 4.666,3.513 0,2.744 -2.068,3.604 -4.666,3.604 M 32.852,26.34 c -1.03,0 -1.996,-0.188 -2.831,-0.502 l 2.803,-8.84 0.06,0 2.745,8.864 c -0.827,0.296 -1.768,0.478 -2.774,0.478 m 20.426,-17.987 -8.837,0 0,21.013 -7.72,-21.013 -7.652,0 -6.596,17.568 c -0.697,-4.428 -5.284,-5.961 -8.89,-7.104 -2.377,-0.765 -4.907,-1.889 -4.884,-3.134 0.02,-1.018 1.359,-1.962 4,-1.821 1.78,0.09 3.35,0.234 6.467,1.741 l 3.07,-5.348 C 19.395,8.802 15.454,7.89 12.23,7.883 l -0.02,0 c -3.761,0 -6.895,1.226 -8.839,3.233 -1.351,1.404 -2.082,3.18 -2.115,5.157 -0.05,2.708 0.947,4.63 3.034,6.167 1.766,1.294 4.019,2.127 6.009,2.751 2.455,0.757 4.459,1.418 4.436,2.827 -0.02,0.513 -0.211,0.994 -0.582,1.374 -0.611,0.635 -1.55,0.87 -2.849,0.899 -2.504,0.05 -4.361,-0.34 -7.319,-2.088 l -2.729,5.423 c 2.949,1.679 6.44,2.661 10.003,2.661 l 0.461,0 c 3.1,-0.06 5.604,-0.945 7.605,-2.553 l 0.324,-0.283 -0.884,2.376 8.025,0 1.348,-4.099 c 1.41,0.477 3.016,0.745 4.716,0.745 1.659,0 3.224,-0.25 4.609,-0.706 l 1.296,4.06 13.094,0 0,-8.49 2.857,0 c 6.9,0 10.986,-3.512 10.986,-9.406 0,-6.56 -3.968,-9.569 -12.416,-9.569" ';
	str += '		 id="path3100" ';
	str += '		 style="fill:#ffffff;fill-zopac:1;fill-rule:evenodd;stroke:none" /> ';
	str += '</svg>';
	return str;
}

function copy() {
	// copy data from textarea to clipboard
	textarea = document.getElementById("IDtextarea");
	textarea.select();
	document.execCommand("copy");
}

function ResizeScreen() {
	// resize screen - no faster than 1 update per second
	if (wait) {
		wait = true;
	} else {
		wait = true;
		setTimeout(function() {
			wait = false;
			addhist();
			parhst[ppt].Gw = Math.trunc((document.body.clientWidth - 40 - parhst[ppt].Hw));
			if (displaymode == "graphic") {
				parameters();
				graphic();
			}
		}, 500);
	}
}

function keyfig() {
	// read all key figures on change of chart type
	if (displaymode == "graphic") parhst[ppt].opr = document.getElementById("IDOPR").value;
	changex();
	changey();
	changez();
}

function changefx() {
	// read keyfigures
	addhist();
	if (displaymode == "graphic") parhst[ppt].selfx = document.getElementById("IDFX").value;
	parhst[ppt].filter = document.getElementById("IDFILTER").value = "";
	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
}

function changeso() {
	// read keyfigures
	addhist();
	if (displaymode == "graphic") parhst[ppt].selopt = document.getElementById("IDSO").value;
	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
}

function promptfilter() {
	// prompt for Filter Value
	var fltmp = document.getElementById("IDFILTER").value = prompt("Edit Filter Value", parhst[ppt].filter);
	if (fltmp == null) parhst[ppt].filter = "";
	else parhst[ppt].filter = fltmp;
	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
}

function changex() {
	// read keyfigures
	addhist();
	if (displaymode == "graphic") parhst[ppt].selx1 = document.getElementById("IDX1").value;
	if (displaymode == "graphic") parhst[ppt].selx2 = document.getElementById("IDX2").value;
	if (displaymode == "graphic") parhst[ppt].selx3 = document.getElementById("IDX3").value;
	if (displaymode == "graphic") parhst[ppt].selx4 = document.getElementById("IDX4").value;

	if (parhst[ppt].stsel == "STK") {
		if (parhst[ppt].selx1 == parhst[ppt].vstack) parhst[ppt].selx1 = "";
		if (parhst[ppt].selx2 == parhst[ppt].vstack) parhst[ppt].selx2 = "";
		if (parhst[ppt].selx3 == parhst[ppt].vstack) parhst[ppt].selx3 = "";
		if (parhst[ppt].selx4 == parhst[ppt].vstack) parhst[ppt].selx4 = "";
	}

	if (parhst[ppt].selx4 == parhst[ppt].selx3 || parhst[ppt].selx4 == parhst[ppt].selx2 || parhst[ppt].selx4 == parhst[ppt].selx1) parhst[ppt].selx4 = '';
	if (parhst[ppt].selx3 == parhst[ppt].selx2 || parhst[ppt].selx3 == parhst[ppt].selx1) parhst[ppt].selx3 = '';
	if (parhst[ppt].selx2 == parhst[ppt].selx1) parhst[ppt].selx2 = '';

	for (var n = 0; n < 3; n++) {
		if (parhst[ppt].selx1 === '' && parhst[ppt].selx2 !== '') {
			parhst[ppt].selx1 = parhst[ppt].selx2;
			parhst[ppt].selx2 = '';
		}
		if (parhst[ppt].selx2 === '' && parhst[ppt].selx3 !== '') {
			parhst[ppt].selx2 = parhst[ppt].selx3;
			parhst[ppt].selx3 = '';
		}
		if (parhst[ppt].selx3 === '' && parhst[ppt].selx4 !== '') {
			parhst[ppt].selx3 = parhst[ppt].selx4;
			parhst[ppt].selx4 = '';
		}
	}

	// if (parhst[ppt].selx3 == parhst[ppt].selx2 || parhst[ppt].selx3 == parhst[ppt].selx1) parhst[ppt].selx3 = '';
	// if (parhst[ppt].selx2 == parhst[ppt].selx1) parhst[ppt].selx2 = '';

	document.getElementById("IDHSTMIN").value = parhst[ppt].hstinpmin = "";
	document.getElementById("IDHSTMAX").value = parhst[ppt].hstinpmax = "";

	document.getElementById("IDXMIN").value = parhst[ppt].xinpmin = "";
	document.getElementById("IDXMAX").value = parhst[ppt].xinpmax = "";

	document.getElementById("IDYTMIN").value = parhst[ppt].ytmin = "";
	document.getElementById("IDYTMAX").value = parhst[ppt].ytmax = "";

	xmin = xmax = "";
	parhst[ppt].xdtick = "";
	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
}

function changey() {
	// read keyfigures
	addhist();
	if (displaymode == "graphic") parhst[ppt].sely1 = document.getElementById("IDY1").value;
	if (displaymode == "graphic") parhst[ppt].sely2 = document.getElementById("IDY2").value;
	if (displaymode == "graphic") parhst[ppt].sely3 = document.getElementById("IDY3").value;
	if (displaymode == "graphic") parhst[ppt].sely4 = document.getElementById("IDY4").value;

	if (parhst[ppt].sely4 == parhst[ppt].sely3 || parhst[ppt].sely4 == parhst[ppt].sely2 || parhst[ppt].sely4 == parhst[ppt].sely1) parhst[ppt].sely4 = '';
	if (parhst[ppt].sely3 == parhst[ppt].sely2 || parhst[ppt].sely3 == parhst[ppt].sely1) parhst[ppt].sely3 = '';
	if (parhst[ppt].sely2 == parhst[ppt].sely1) parhst[ppt].sely2 = '';

	for (var n = 0; n < 3; n++) {
		if (parhst[ppt].sely1 === '' && parhst[ppt].sely2 !== '') {
			parhst[ppt].sely1 = parhst[ppt].sely2;
			parhst[ppt].sely2 = '';
		}
		if (parhst[ppt].sely2 === '' && parhst[ppt].sely3 !== '') {
			parhst[ppt].sely2 = parhst[ppt].sely3;
			parhst[ppt].sely3 = '';
		}
		if (parhst[ppt].sely3 === '' && parhst[ppt].sely4 !== '') {
			parhst[ppt].sely3 = parhst[ppt].sely4;
			parhst[ppt].sely4 = '';
		}
	}

	// if (parhst[ppt].sely3 == parhst[ppt].sely2 || parhst[ppt].sely3 == parhst[ppt].sely1) parhst[ppt].sely3 = '';
	// if (parhst[ppt].sely2 == parhst[ppt].sely1) parhst[ppt].sely2 = '';

	document.getElementById("IDYTMAX").value = parhst[ppt].ytmax = "";
	ymax = 0;
	document.getElementById("IDYTMIN").value = parhst[ppt].ytmin = "";
	ymin = 0;

	xmin = xmax = "";
	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
}

function changez() {
	// read keyfigures
	addhist();
	if (displaymode == "graphic") parhst[ppt].selz1 = document.getElementById("IDZ1").value;
	if (displaymode == "graphic") parhst[ppt].selz2 = document.getElementById("IDZ2").value;
	if (displaymode == "graphic") parhst[ppt].selz3 = document.getElementById("IDZ3").value;
	if (displaymode == "graphic") parhst[ppt].selz4 = document.getElementById("IDZ4").value;
	
	// if (parhst[ppt].selz1 == parhst[ppt].sely1 || parhst[ppt].selz1 == parhst[ppt].sely2 || parhst[ppt].selz1 == parhst[ppt].sely3 || parhst[ppt].selz1 == parhst[ppt].sely4 ) parhst[ppt].selz1 = '';
  // if (parhst[ppt].selz2 == parhst[ppt].sely1 || parhst[ppt].selz2 == parhst[ppt].sely2 || parhst[ppt].selz2 == parhst[ppt].sely3 || parhst[ppt].selz2 == parhst[ppt].sely4 ) parhst[ppt].selz2 = '';
  // if (parhst[ppt].selz3 == parhst[ppt].sely1 || parhst[ppt].selz3 == parhst[ppt].sely2 || parhst[ppt].selz3 == parhst[ppt].sely3 || parhst[ppt].selz3 == parhst[ppt].sely4 ) parhst[ppt].selz3 = '';
  // if (parhst[ppt].selz4 == parhst[ppt].sely1 || parhst[ppt].selz4 == parhst[ppt].sely2 || parhst[ppt].selz4 == parhst[ppt].sely3 || parhst[ppt].selz4 == parhst[ppt].sely4 ) parhst[ppt].selz4 = '';
  
	if (parhst[ppt].selz4 == parhst[ppt].selz3 || parhst[ppt].selz4 == parhst[ppt].selz2 || parhst[ppt].selz4 == parhst[ppt].selz1) parhst[ppt].selz4 = '';
	if (parhst[ppt].selz3 == parhst[ppt].selz2 || parhst[ppt].selz3 == parhst[ppt].selz1) parhst[ppt].selz3 = '';
	if (parhst[ppt].selz2 == parhst[ppt].selz1) parhst[ppt].selz2 = '';

	for (var n = 0; n < 3; n++) {
		if (parhst[ppt].selz1 === '' && parhst[ppt].selz2 !== '') {
			parhst[ppt].selz1 = parhst[ppt].selz2;
			parhst[ppt].selz2 = '';
		}
		if (parhst[ppt].selz2 === '' && parhst[ppt].selz3 !== '') {
			parhst[ppt].selz2 = parhst[ppt].selz3;
			parhst[ppt].selz3 = '';
		}
		if (parhst[ppt].selz3 === '' && parhst[ppt].selz4 !== '') {
			parhst[ppt].selz3 = parhst[ppt].selz4;
			parhst[ppt].selz4 = '';
		}
	}

	// if (parhst[ppt].sely3 == parhst[ppt].sely2 || parhst[ppt].sely3 == parhst[ppt].sely1) parhst[ppt].sely3 = '';
	// if (parhst[ppt].sely2 == parhst[ppt].sely1) parhst[ppt].sely2 = '';

  if (parhst[ppt].sndyaxis) {
	  document.getElementById("IDZTMAX").value = parhst[ppt].ztmax = "";
	  zmax = 0;
	  document.getElementById("IDZTMIN").value = parhst[ppt].ztmin = "";
	  zmin = 0;
	}

	xmin = xmax = "";
	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
}

function changef() {
	// read multiplicator
	addhist();
	if (document.getElementById("IDFC").value !== parhst[ppt].selfc) document.getElementById("IDFACT").value = 1;
	if (displaymode == "graphic") parhst[ppt].selfc = document.getElementById("IDFC").value;
	if (displaymode == "graphic") parhst[ppt].fact = document.getElementById("IDFACT").value;

	if (parhst[ppt].fact == 0) {
		parhst[ppt].fact = 1;
		document.getElementById("IDFACT").value = parhst[ppt].fact;
	}

	if (parhst[ppt].selfc == parhst[ppt].sely1) {
		parhst[ppt].sely1 = "";
		document.getElementById("IDY1").value = parhst[ppt].sely1;
	}
	if (parhst[ppt].selfc == parhst[ppt].sely2) {
		parhst[ppt].sely2 = "";
		document.getElementById("IDY2").value = parhst[ppt].sely2;
	}
	if (parhst[ppt].selfc == parhst[ppt].sely3) {
		parhst[ppt].sely3 = "";
		document.getElementById("IDY3").value = parhst[ppt].sely3;
	}
	if (parhst[ppt].selfc == parhst[ppt].sely4) {
		parhst[ppt].sely4 = "";
		document.getElementById("IDY4").value = parhst[ppt].sely4;
	}

	document.getElementById("IDYTMAX").value = parhst[ppt].ytmax = "";
	ymax = 0;
	document.getElementById("IDYTMIN").value = parhst[ppt].ytmin = "";
	ymin = 0;

	xmin = xmax = "";

	changey();
}

function changevstack() {
	// read keyfigures
	addhist();
	if (displaymode == "graphic") parhst[ppt].vstack = document.getElementById("IDVSTACK").value;
	// Default rounding
	if (parhst[ppt].vstack !== "" && parhst[ppt - 1].vstack == "") parhst[ppt].tround = true;
	if (parhst[ppt].stsel == "STK") {
		if (parhst[ppt].vstack == parhst[ppt].selx1) {
			document.getElementById("IDX1").value = "";
			changex();
		}
		if (parhst[ppt].vstack == parhst[ppt].selx2) {
			document.getElementById("IDX2").value = "";
			changex();
		}
		if (parhst[ppt].vstack == parhst[ppt].selx3) {
			document.getElementById("IDX3").value = "";
			changex();
		}
		if (parhst[ppt].vstack == parhst[ppt].selx4) {
			document.getElementById("IDX4").value = "";
			changex();
		}
	}
	// parhst[ppt].maxpnt = 0;
	ymax = ymin = 0;
	parhst[ppt].ytmax = parhst[ppt].ytmin = "";
	document.getElementById("IDYTMAX").value = "";
	document.getElementById("IDYTMIN").value = "";
	stackmode();
}

function SAPclick() {
  try { infile = null; } catch (e) { }
  parameters();
}

function getsep() {
	colsep = document.getElementById('IDsep').value;
	// read additional custom column separator
	if (colsep == "s" || colsep == "S" || colsep == " ") {
		sspace = true;
	} else {
		sspace = false;
	}
}

function changeparam() {
	// read changed parameters
  var ytmp;
	addhist();
	if (displaymode == "graphic") {
	  parhst[ppt].ytmin = document.getElementById("IDYTMIN").value;
	  parhst[ppt].ytmax = document.getElementById("IDYTMAX").value;
	  parhst[ppt].opaci = document.getElementById("IDopaci").value;
	  

	  if (parhst[ppt].opaci < 0) parhst[ppt].opaci = 0;
	  if (parhst[ppt].opaci > 1) parhst[ppt].opaci = 1;
	  parhst[ppt].opaci = parseInt( Math.floor( parhst[ppt].opaci * 20 ) ) / 20;
	  
	  if (parhst[ppt].sndyaxis) {
	    parhst[ppt].ztmin = document.getElementById("IDZTMIN").value;
	    parhst[ppt].ztmax = document.getElementById("IDZTMAX").value;
	    parhst[ppt].zopac = document.getElementById("IDzopac").value;
	    
	    if (parhst[ppt].zopac < 0) parhst[ppt].zopac = 0;
	    if (parhst[ppt].zopac > 1) parhst[ppt].zopac = 1;
	    parhst[ppt].zopac = parseInt( Math.floor( parhst[ppt].zopac * 20 ) ) / 20;
	  }
	}

	if (parhst[ppt].ytmin.includes(">")) {
		ytmp = parhst[ppt].ytmin.split(">");
		ymin = parseFloat(ytmp[0]);
		vmin = parseFloat(ytmp[1]);
	} else {
		ymin = parseFloat(ymin);
		vmin = "";
	}
	zmin = parseFloat(parhst[ppt].ztmin);

	if (parhst[ppt].ytmax.includes("<")) {
		ytmp = parhst[ppt].ytmax.split("<");
		ymax = parseFloat(ytmp[0]);
		vmax = parseFloat(ytmp[1]);
	} else {
		ymax = parseFloat(ymax);
		vmax = "";
	}
	zmax = parseFloat(parhst[ppt].ztmax);

	if (displaymode == "graphic") {
		parhst[ppt].xinpmin = document.getElementById("IDXMIN").value;
		parhst[ppt].hstinpmin = document.getElementById("IDHSTMIN").value;
		parhst[ppt].xinpmax = document.getElementById("IDXMAX").value;
		parhst[ppt].hstinpmax = document.getElementById("IDHSTMAX").value;
		parhst[ppt].maxpnt = document.getElementById("IDMAXPNT").value;
		parhst[ppt].dtsize = document.getElementById("IDDTSIZE").value;
		parhst[ppt].avgint = document.getElementById("IDAVGINT").value;
		parhst[ppt].filter = document.getElementById("IDFILTER").value;
		parhst[ppt].vstack = document.getElementById("IDVSTACK").value;
		parhst[ppt].opr = document.getElementById("IDOPR").value;
		parhst[ppt].scnt = document.getElementById("IDSCNT").value;
		
		if (parhst[ppt].sndyaxis) parhst[ppt].ztsize = document.getElementById("IDZTSIZE").value;
	}

	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
}

function reset() {
	// reset Graphic
	addhist();
	parhst[ppt].Gw = 0;
	document.getElementById("IDXMIN").value = parhst[ppt].xinpmin = "";
	document.getElementById("IDXMAX").value = parhst[ppt].xinpmax = "";
	document.getElementById("IDHSTMIN").value = parhst[ppt].hstinpmin = "";
	document.getElementById("IDHSTMAX").value = parhst[ppt].hstinpmax = "";
	document.getElementById("IDYTMIN").value = parhst[ppt].ytmin = "";
	document.getElementById("IDYTMAX").value = parhst[ppt].ytmax = "";
	document.getElementById("IDYTMIN").value = parhst[ppt].ztmin = "";
	document.getElementById("IDYTMAX").value = parhst[ppt].ztmax = "";
	parameters();
	graphic();
}

function parameters() {
	// Main Menu (select fields, ranges & plot parameters)

	var x = 0;
	var str = "";
	if (dprev) p0 = perfnow();

	// input/output of configuration parameters
	if (data.length == 0) {
		alert('No input data specified - upload file or enter data in text area');
		return;
	}

	// default bar chart if less than 200 data points
	if (init) {
		if (data.length < 200) {
			parhst[ppt].grtype = 'bar';
			showhide(true);
			gwidth = 0.95;

		}
		init = false;
		if (DAC == false) loaddefault();
	}

	// prepare graphic on first start (select 1st numeric column)
	if (start) {
		if (parhst[ppt].sely1 == '') {
			for (x = 0; x < header.length; x++) {
				if (header[x][1] == "n") {
					parhst[ppt].sely1 = x;
					break;
				}
			}
		}
	}

	// infile = null;
	// txtarea = null;
	
	// Initialize values for 2nd Axis
	if ( parhst[ppt].grztype == undefined) parhst[ppt].grztype = "line";
	if ( parhst[ppt].selz1 == undefined) parhst[ppt].selz1 = '';
	if ( parhst[ppt].selz2 == undefined) parhst[ppt].selz2 = '';
	if ( parhst[ppt].selz3 == undefined) parhst[ppt].selz3 = '';
	if ( parhst[ppt].selz4 == undefined) parhst[ppt].selz4 = '';
	if ( parhst[ppt].ztmin == undefined) parhst[ppt].ztmin = '';
	if ( parhst[ppt].ztmax == undefined) parhst[ppt].ztmax = '';
	if ( parhst[ppt].zlogdis == undefined) parhst[ppt].zlogdis = false;
	if ( parhst[ppt].zshape == undefined) parhst[ppt].zshape = "linear";
	if ( parhst[ppt].pzcolor == undefined) parhst[ppt].pzcolor = '#FFA500';
	if ( parhst[ppt].ztsize == undefined) parhst[ppt].ztsize = 1;
	if ( parhst[ppt].sndyaxis == undefined) parhst[ppt].sndyaxis = false;
	if ( parhst[ppt].zopac == undefined) parhst[ppt].zopac = 0.5;

	document.getElementById('ID(C)').innerHTML = "";
	document.getElementById('IDdata').innerHTML = "";
	document.getElementById('IDinfo').innerHTML = "";
	document.getElementById('IDpreview').innerHTML = "";

	// show graphs if previously hidden during export
	if (parhst[ppt].showhist) document.getElementById("IDhst").style.display = "inline-block";
	document.getElementById("IDgrp").style.display = "inline-block";

	if (parhst[ppt].scnt > 200) parhst[ppt].scnt = 200;
	if (parhst[ppt].scnt < 1) parhst[ppt].scnt = 1;

	if (parhst[ppt].maxpnt == 0) {
		if (parhst[ppt].grtype == 'bar') {
			var sl = sdat.length;
			if (sl == 0) sl = 1;
			var ww = Math.trunc((window.innerWidth * 0.85 - 100) / (10 * sl));
			document.getElementById("IDMAXPNT").value = parhst[ppt].maxpnt = ww;
		} else {
			if (data.length > 10000) parhst[ppt].maxpnt = 10000;
			else parhst[ppt].maxpnt = data.length;
		}
		document.getElementById("IDMAXPNT").value = parhst[ppt].maxpnt;
	}

	if (parhst[ppt].avgint == 0) {
		if (parhst[ppt].grtype == 'bar') {
			parhst[ppt].avgint = Math.trunc(upt / parhst[ppt].maxpnt);
		} else {
			upt = Math.trunc(upt / (window.innerWidth * 2));
			if (upt < 1) upt = 1;
			parhst[ppt].avgint = upt;
		}
	}
	// if (parhst[ppt].vstack !== "") parhst[ppt].avgint = 1;

	displaymode = "graphic";

	document.title = "Graphic Display";

	var htmlcont = "";
	document.getElementById('IDload').innerHTML = "";
	document.getElementById('IDoutput').innerHTML = "";

	// Style definitions	
	if (!mainstyle) {
		var vstyle = document.createElement('style');
		vstyle.id = 'STYLEmain';
		vstyle.innerHTML = '';
		// vstyle.innerHTML += " input.selcol      { width:2em; height:1.5em; padding:0px; margin:0px; border-top-style:hidden; border-right-style:hidden; border-left-style:hidden; border-bottom-style:hidden; outline:0; border:0; }";
		vstyle.innerHTML += " input.selcol      { width:2em; height:0.8em; padding:0; margin:0; border: none; background: none; }";
		vstyle.innerHTML += " input[type='color']::-webkit-color-swatch-wrapper { padding: 0; margin: 0; }";
		vstyle.innerHTML += " input[type='color']::-webkit-color-swatch { border: solid 1px #888; }";
		vstyle.innerHTML += " .no-outline:focus { outline: none; }";
		vstyle.innerHTML += " td { padding-right: 0.2em; padding-left: 0.2em; padding-top: 0px; padding-bottom: 0px;}";
		vstyle.innerHTML += " input		    { color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + ";}";
		vstyle.innerHTML += " div.bgcol		{ display:inline-block; background-color:gray; margin:0px; padding:0.5px; }";
		vstyle.innerHTML += " .dotred { height: 10px; width: 10px; background-color: #f00; border-radius: 50%; display: inline-block; }";
		vstyle.innerHTML += " .dotyel { height: 10px; width: 10px; background-color: #fa4; border-radius: 50%; display: inline-block; }";
		vstyle.innerHTML += " .dotgre { height: 10px; width: 10px; background-color: #282; border-radius: 50%; display: inline-block; }";
		document.body.appendChild(vstyle);
		mainstyle = true;
	}

	htmlcont += "<table><tr>";
	htmlcont += "<td rowspan='5' valign='top'><a id='IDSAPLOGO'  title='' style='text-decoration:none' href='#' onclick='SAPclick()' >" + SAPlogo(100, 50) + "</a>    <br><br><button onclick='graphic()' title='Refresh Graphic (apply pending settings) [F8]'><b>Refresh</b></button><button title='Reset Graphic' onclick='reset()'><b>RS</b></button> <span title='Status (YELLOW = refresh pending; RED = busy)' id='IDDOT' class='dotgre'></span></td>";

	//  ++++++++++++++++++++++++++ X-Axis ++++++++++++++++++++++++++
	htmlcont += "<td><div>";
	htmlcont += " <b>X-Axis</b> Min/Max: <input id='IDXMIN' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "'onchange='changeparam()' type='text' name='xmin' size='17' value='" + parhst[ppt].xinpmin + "'><input id='IDXMAX' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "'onchange='changeparam()' type='text' name='xmax' size='17' value='" + parhst[ppt].xinpmax + "'>";
	// select X-Axis (1st field)
	str = " X: ";
	str += "<select id='IDX1' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changex()'>\n";
	if (parhst[ppt].selx1 === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (x === parseInt(parhst[ppt].selx1)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;

	// select X-Axis (2nd field)
	str = " ";
	str += "<select id='IDX2' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changex()'>\n";
	if (parhst[ppt].selx2 === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (x === parseInt(parhst[ppt].selx2)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;

	// select X-Axis (3rd field)
	str = " ";
	str += "<select id='IDX3' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changex()'>\n";
	if (parhst[ppt].selx3 === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (x === parseInt(parhst[ppt].selx3)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;

	// select X-Axis (4th field)
	str = " ";
	str += "<select id='IDX4' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changex()'>\n";
	if (parhst[ppt].selx4 === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (x === parseInt(parhst[ppt].selx4)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;
	
	htmlcont += "</div></td><td colspan=2><div>";		

	// select Field to Filter
	htmlcont += "Filter: ";
	str = "";
	str += "<select id='IDFX' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changefx()'>\n";
	if (parhst[ppt].selx2 === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (x === parseInt(parhst[ppt].selfx)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;

	str = " <select id='IDSO' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeso()'>\n";
	if (parhst[ppt].selopt == "==") str += "<option value='==' selected > == </option> \n";
	else str += "<option value='==' > == </option>";
	if (parhst[ppt].selopt == "<>") str += "<option value='<>' selected > &lt;&gt; </option> \n";
	else str += "<option value='<>' > &lt;&gt; </option>";
	str += "</select>";
	htmlcont += str;

	htmlcont += " <input id='IDFILTER' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' ondblclick='promptfilter()' onchange='changeparam()' type='text' name='filter' size='17' value='" + parhst[ppt].filter + "'>";

	if (parhst[ppt].tround) {
		htmlcont += " <button id='IDROUND' title='round time to n seconds' style='color:black' onclick='settround()'><B>R</b></button> ";
	} else {
		htmlcont += " <button id='IDROUND' title='round time to n seconds' style='color:gray' onclick='settround()'>R</button> ";
	}

	str = "<select id='IDSROUND' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='setsround()'>\n";
	if (parhst[ppt].sround == 1) str += "<option value='1' selected > 1 </option> \n";
	else str += "<option value='1' > 1 </option>";
	if (parhst[ppt].sround == 5) str += "<option value='5' selected > 5 </option> \n";
	else str += "<option value='5' > 5 </option>";
	if (parhst[ppt].sround == 10) str += "<option value='10' selected > 10 </option> \n";
	else str += "<option value='10' > 10 </option>";
	if (parhst[ppt].sround == 15) str += "<option value='15' selected > 15 </option> \n";
	else str += "<option value='15' > 15 </option>";
	if (parhst[ppt].sround == 20) str += "<option value='20' selected > 20 </option> \n";
	else str += "<option value='20' > 20 </option>";
	if (parhst[ppt].sround == 30) str += "<option value='30' selected > 30 </option> \n";
	else str += "<option value='30' > 30 </option>";
	if (parhst[ppt].sround == 60) str += "<option value='60' selected > 60 </option> \n";
	else str += "<option value='60' > 60 </option>";
	if (parhst[ppt].sround == 120) str += "<option value='120' selected > 120 </option> \n";
	else str += "<option value='120' >120 </option>";
	if (parhst[ppt].sround == 300) str += "<option value='300' selected > 300 </option> \n";
	else str += "<option value='300' > 300 </option>";
	if (parhst[ppt].sround == 600) str += "<option value='600' selected > 600 </option> \n";
	else str += "<option value='600' > 600 </option>";
	if (parhst[ppt].sround == 900) str += "<option value='900' selected > 900 </option> \n";
	else str += "<option value='900' > 900 </option>";
	if (parhst[ppt].sround == 1200) str += "<option value='1200' selected > 1200 </option> \n";
	else str += "<option value='1200' > 1200 </option>";
	if (parhst[ppt].sround == 1800) str += "<option value='1800' selected > 1800 </option> \n";
	else str += "<option value='1800' > 1800 </option>";
	if (parhst[ppt].sround == 3600) str += "<option value='3600' selected > 3600 </option> \n";
	else str += "<option value='3600' > 3600 </option>";
	str += "</select>";
	htmlcont += str;

	if (parhst[ppt].cleand) {
		htmlcont += " <button id='IDCLEAND' title='eliminate data points not present in all stacks' onclick='setcleand()'>E</button> ";
	} else {
		htmlcont += " <button id='IDCLEAND' title='add missing data points' style='color:black' onclick='setcleand()'>A</button> ";
	}

	htmlcont += "</div></td>";

	htmlcont += "</tr>";

	//  ++++++++++++++++++++++++++ Y-Axis ++++++++++++++++++++++++++
	htmlcont += "<tr>";
	htmlcont += "<td><div>";

	htmlcont += " <b>Y-Axis</b> Min/Max: <input id='IDYTMIN' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeparam()' type='text' size='17' name='ymin' value='" + parhst[ppt].ytmin + "'><input id='IDYTMAX' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeparam()' type='text' size='17' name='ymax' value='" + parhst[ppt].ytmax + "'>";

	// select Y-Axis (1st field)
	str = " Y: ";
	str += "<select id='IDY1' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changey()'>\n";
	if (parhst[ppt].sely1 === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (header[x][1] != "n") continue;
		if (x === parseInt(parhst[ppt].sely1)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;

	// select Y-Axis (2nd field)
	str = " ";
	str += "<select id='IDY2' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changey()'>\n";
	if (parhst[ppt].sely2 === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (header[x][1] != "n") continue;
		if (x === parseInt(parhst[ppt].sely2)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;

	// select Y-Axis (3rd field)
	str = " ";
	str += "<select id='IDY3' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changey()'>\n";
	if (parhst[ppt].sely3 === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (header[x][1] != "n") continue;
		if (x === parseInt(parhst[ppt].sely3)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;

	// select Y-Axis (4th field)
	str = " ";
	str += "<select id='IDY4' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changey()'>\n";
	if (parhst[ppt].sely4 === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (header[x][1] != "n") continue;
		if (x === parseInt(parhst[ppt].sely4)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;

	htmlcont += "</div></td><td><div>";

	// select Stack Group Variable 
	str = "";
	str += "StkGrp: <select id='IDVSTACK' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changevstack()'>\n";
	if (parhst[ppt].vstack === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (x === parseInt(parhst[ppt].vstack)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;
	htmlcont += " <input id='IDSCNT' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeparam()' min='0' max='9999' type='number' name='scnt' value='" + parhst[ppt].scnt + "'>";

	htmlcont += "</div></td><td><div>";

	// select Multiplicator
	str = " ";
	str += "Factor: <select id='IDFC' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changef()'>\n";
	if (parhst[ppt].selfc === "") str += "<option value='' selected > - </option>";
	else str += "<option value=''> - </option>";
	for (x = 0; x < header.length; x++) {
		if (header[x][1] != "n") continue;
		if (x === parseInt(parhst[ppt].selfc)) {
			str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
		} else {
			str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
		}
	}
	str += "</select>";
	htmlcont += str;
	htmlcont += " <input id='IDFACT' style='width:5em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changef()' type='number' size='6' name='fact' step='any' value='" + parhst[ppt].fact + "'>";
	htmlcont += "</div></td>";
	
	
	//  ++++++++++++++++++++++++++ Z-Axis ++++++++++++++++++++++++++
	if ( parhst[ppt].sndyaxis ) {
		htmlcont += "<tr>";
		htmlcont += "<td><div>";

		htmlcont += " <b>2nd Y </b> Min/Max: <input id='IDZTMIN' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeparam()' type='text' size='17' name='zmin' value='" + parhst[ppt].ztmin + "'><input id='IDZTMAX' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeparam()' type='text' size='17' name='zmax' value='" + parhst[ppt].ztmax + "'>";

		// select Z-Axis (1st field)
		str = " Z: ";
		str += "<select id='IDZ1' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changez()'>\n";
		if (parhst[ppt].selz1 === "") str += "<option value='' selected > - </option>";
		else str += "<option value=''> - </option>";
		for (x = 0; x < header.length; x++) {
			if (header[x][1] != "n") continue;
			if (x === parseInt(parhst[ppt].selz1)) {
				str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
			} else {
				str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
			}
		}
		str += "</select>";
		htmlcont += str;

		// select Z-Axis (2nd field)
		str = " ";
		str += "<select id='IDZ2' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changez()'>\n";
		if (parhst[ppt].selz2 === "") str += "<option value='' selected > - </option>";
		else str += "<option value=''> - </option>";
		for (x = 0; x < header.length; x++) {
			if (header[x][1] != "n") continue;
			if (x === parseInt(parhst[ppt].selz2)) {
				str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
			} else {
				str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
			}
		}
		str += "</select>";
		htmlcont += str;

		// select Z-Axis (3rd field)
		str = " ";
		str += "<select id='IDZ3' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changez()'>\n";
		if (parhst[ppt].selz3 === "") str += "<option value='' selected > - </option>";
		else str += "<option value=''> - </option>";
		for (x = 0; x < header.length; x++) {
			if (header[x][1] != "n") continue;
			if (x === parseInt(parhst[ppt].selz3)) {
				str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
			} else {
				str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
			}
		}
		str += "</select>";
		htmlcont += str;

		// select Z-Axis (4th field)
		str = " ";
		str += "<select id='IDZ4' style='width:9em; color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changez()'>\n";
		if (parhst[ppt].selz4 === "") str += "<option value='' selected > - </option>";
		else str += "<option value=''> - </option>";
		for (x = 0; x < header.length; x++) {
			if (header[x][1] != "n") continue;
			if (x === parseInt(parhst[ppt].selz4)) {
				str += "<option value='" + x + "' selected >" + header[x][0] + "</option> \n";
			} else {
				str += "<option value='" + x + "'>" + header[x][0] + "</option> \n";
			}
		}
		str += "</select>";
		htmlcont += str;

		htmlcont += "</div></td><td colspan='2'><div>";

		// Type
		htmlcont += "<select id='IDGRZTYPE' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='graphzmode()'>\n";
		if (parhst[ppt].grztype == 'scatter') htmlcont += "<option value='scatter' selected > Scatter </option> \n";
		else htmlcont += "<option value='scatter'> Scatter </option> \n";
		if (parhst[ppt].grztype == 'line') htmlcont += "<option value='line' selected > Line </option> \n";
		else htmlcont += "<option value='line'> Line </option> \n";
		if (parhst[ppt].grztype == 'area') htmlcont += "<option value='area' selected > Area </option> \n";
		else htmlcont += "<option value='area'> Area </option> \n";
		htmlcont += "</select>";
		
		if (parhst[ppt].zlogdis) {
			htmlcont += " <button id='IDZLOGDIS' title='2nd-Axis: logarithmic scale' style='color:black' onclick='setzlogdis()'><B>Log</b></button>";
		} else {
			htmlcont += " <button id='IDZLOGDIS' title='2nd-Axis: linear scale' style='color:gray' onclick='setzlogdis()'>Lin</button>";
		}
	
		str = " <select id='IDZSHAPE' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='setshape()'>\n";
		if (parhst[ppt].zshape == 'linear') str += "<option value='linear' selected > linear </option> \n";
		else str += "<option value='linear' > linear </option>";
		if (parhst[ppt].zshape == 'spline') str += "<option value='spline' selected > spline </option> \n";
		else str += "<option value='spline' > spline </option>";
		if (parhst[ppt].zshape == 'hvh') str += "<option value='hvh' selected > steps </option> \n";
		else str += "<option value='hvh' > steps </option>";
		str += "</select>";
		htmlcont += str;
	
		htmlcont += " Size: <input id='IDZTSIZE' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeparam()' min='0' max='10' type='number' name='dtsize' value='" + parhst[ppt].ztsize + "'>";
		
		htmlcont += " Color: <input id='IDpzcolor' title='Set Color of Data Points' class='selcol' onchange='setptcol()' type='color' value='" + parhst[ppt].pzcolor + "'>";
		htmlcont += " <input type='number' title='Opacity' onchange='changeparam()' id='IDzopac'  style='width:4em;' size='6' step='0.05' value='" + parhst[ppt].zopac +  "' min='0' max='1'>";


		htmlcont += "</div></td>";
	
		htmlcont += "</tr>";
  }


  //  ++++++++++++++++++++++++++ 4th Line ++++++++++++++++++++++++++
	htmlcont += "<tr><td colspan='3'>";
	htmlcont += " <b>Hist.</b>  Min/Max: <input id='IDHSTMIN'  dir='ltr' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "'onchange='changeparam()' type='text' name='hstmin' size='17' value='" + parhst[ppt].hstinpmin + "'><input id='IDHSTMAX'  dir='ltr' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "'onchange='changeparam()' type='text' name='hstmax' size='17' value='" + parhst[ppt].hstinpmax + "'>";
	htmlcont += " <input id='IDco1' class='selcol' onchange='getthsval()' type='color'  value='" + parhst[ppt].colsc[0][1] + "'>";
	htmlcont += " <input id='IDth1' onchange='getthsval()' type='number' style='width: 5em;' value='" + parhst[ppt].colsc[0][0] + "'>";
	htmlcont += " <input id='IDco2' class='selcol' onchange='getthsval()' type='color'  value='" + parhst[ppt].colsc[1][1] + "'>";
	htmlcont += " <input id='IDth2' onchange='getthsval()' type='number' style='width: 5em;' value='" + parhst[ppt].colsc[1][0] + "'>";
	htmlcont += " <input id='IDco3' class='selcol' onchange='getthsval()' type='color'  value='" + parhst[ppt].colsc[2][1] + "'>";
	htmlcont += " <input id='IDth3' onchange='getthsval()' type='number' style='width: 5em;' value='" + parhst[ppt].colsc[2][0] + "'>";
	htmlcont += " <input id='IDco4' class='selcol' onchange='getthsval()' type='color'  value='" + parhst[ppt].colsc[3][1] + "'>";
	htmlcont += " BG Color: <input id='IDbgcolor' title='Set Background Color'     class='selcol' onchange='setbgcol()' type='color' value='" + parhst[ppt].bgcolor + "'> <input id='IDchcolor' title='Set Paper Color'     class='selcol' onchange='setchcol()' type='color' value='" + parhst[ppt].chcolor + "'>";
	htmlcont += " PT Color: <input id='IDptcolor' title='Set Color of Data Points' class='selcol' onchange='setptcol()' type='color' value='" + parhst[ppt].ptcolor + "'>";
	htmlcont += " <input id='IDp1color' title='Set Color of Data Points' class='selcol' onchange='setptcol()' type='color' value='" + parhst[ppt].p1color + "'>";
	htmlcont += " <input id='IDp2color' title='Set Color of Data Points' class='selcol' onchange='setptcol()' type='color' value='" + parhst[ppt].p2color + "'>";
	htmlcont += " <input id='IDp3color' title='Set Color of Data Points' class='selcol' onchange='setptcol()' type='color' value='" + parhst[ppt].p3color + "'>";
	
	htmlcont += " <input type='number' title='Opacity' onchange='changeparam()' id='IDopaci'  style='width:4em;' size='6' step='0.05' value='" + parhst[ppt].opaci +  "' min='0' max='1'>";

	if (parhst[ppt].showhist) {
		htmlcont += " <button id='IDBHST' onclick='showhide()'>Hide Histogram</button>";
	} else {
		htmlcont += " <button id='IDBHST' onclick='showhide()'>Show Histogram</button>";
	}
	
	htmlcont += "<button title='Display Data' onclick='expvdat()'>Display</button>";
	htmlcont += "<button title='Compact Data (delete every second value for first X-Axis)' onclick='CompData()'> C </button>";
	
	if (parhst[ppt].sndyaxis) {
		htmlcont += " <button title='Hide 2nd Y-Axis' onclick='toggle2ndaxis()'><B> 2nd Y-Axis </B></button>";
	} else {
		htmlcont += " <button title='Display 2nd Y-Axis' onclick='toggle2ndaxis()'> 2nd Y-Axis </button>";
	}


	htmlcont += " </td></tr>";
	htmlcont += " <tr><td colspan='3'>";

  //  ++++++++++++++++++++++++++ 5th Line ++++++++++++++++++++++++++

	// Type
	htmlcont += "<select id='IDGRTYPE' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='graphmode()'>\n";
	if (parhst[ppt].stsel != 'STK') {
		if (parhst[ppt].grtype == 'scatter') htmlcont += "<option value='scatter' selected > Scatter </option> \n";
		else htmlcont += "<option value='scatter'> Scatter </option> \n";
		if (parhst[ppt].grtype == 'bar') htmlcont += "<option value='bar' selected > Bar </option> \n";
		else htmlcont += "<option value='bar'> Bar </option> \n";
		if (parhst[ppt].grtype == 'line') htmlcont += "<option value='line' selected > Line </option> \n";
		else htmlcont += "<option value='line'> Line </option> \n";
		if (parhst[ppt].grtype == 'area') htmlcont += "<option value='area' selected > Area </option> \n";
		else htmlcont += "<option value='area'> Area </option> \n";
	} else {
		if (parhst[ppt].grtype == 'bar') htmlcont += "<option value='bar' selected > Bar </option> \n";
		else htmlcont += "<option value='bar'> Bar </option> \n";
		if (parhst[ppt].grtype == 'area') htmlcont += "<option value='area' selected > Area </option> \n";
		else htmlcont += "<option value='area'> Area </option> \n";
		if (parhst[ppt].grtype == 'line') htmlcont += "<option value='line' selected > Line </option> \n";
		else htmlcont += "<option value='line'> Line </option> \n";
	}
	htmlcont += "</select>";

	// group or stack
	str = "";
	if (parhst[ppt].stsel == 'ADD') {
		str += " <select id='IDSTSEL' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='stackmode()'>\n <option value='ADD' selected >Summarize Key Figures</option>\n <option value='STK'	      >Stack Key Figures</option>\n";
		if (parhst[ppt].vstack == "") {
			str += "<option value='IND'          >Independent Key Figures</option>\n";
		}
		str += "</select>";
	}
	if (parhst[ppt].stsel == 'STK') {
		str += " <select id='IDSTSEL' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='stackmode()'>\n <option value='ADD'	       >Summarize Key Figures</option>\n <option value='STK' selected >Stack Key Figures</option>\n";
		if (parhst[ppt].vstack == "") {
			str += "<option value='IND'	        >Independent Key Figures</option>\n";
		}
		str += "</select>";
	}
	if (parhst[ppt].stsel == 'IND') {
		str += " <select id='IDSTSEL' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='stackmode()'>\n <option value='ADD'	       >Summarize Key Figures</option>\n <option value='STK'          >Stack Key Figures</option>\n";
		if (parhst[ppt].vstack == "") {
			str += "<option value='IND' selected >Independent Key Figures</option>\n";
		}
		str += "</select>";
	}
	htmlcont += str;

	htmlcont += " Points: <input id='IDMAXPNT' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeparam()' min='1000' max='1000000' type='number' name='maxpnt' value='" + parhst[ppt].maxpnt + "'>";
	htmlcont += " Size: <input id='IDDTSIZE' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeparam()' min='0' max='10' type='number' name='dtsize' value='" + parhst[ppt].dtsize + "'>";
	htmlcont += " Average: <input id='IDAVGINT' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='changeparam()' min='1' max='1000000' type='number' name='avgint' value='" + parhst[ppt].avgint + "'>";

	// SUM / AVG / MIN / AMX
	if (parhst[ppt].opr == 'SUM') htmlcont += " <select id='IDOPR' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='keyfig()'> <option value='SUM' selected >SUM</option> <option value='AVG'		      >AVG</option> <option value='MAX'		       >MAX</option> <option value='MIN'		      >MIN</option></select>";
	if (parhst[ppt].opr == 'AVG') htmlcont += " <select id='IDOPR' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='keyfig()'> <option value='SUM'		       >SUM</option> <option value='AVG' selected >AVG</option> <option value='MAX'		       >MAX</option> <option value='MIN'		      >MIN</option></select>";
	if (parhst[ppt].opr == 'MAX') htmlcont += " <select id='IDOPR' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='keyfig()'> <option value='SUM'		       >SUM</option> <option value='AVG'		      >AVG</option> <option value='MAX' selected >MAX</option> <option value='MIN'		      >MIN</option></select>";
	if (parhst[ppt].opr == 'MIN') htmlcont += " <select id='IDOPR' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='keyfig()'> <option value='SUM'	         >SUM</option> <option value='AVG'		      >AVG</option> <option value='MAX'		       >MAX</option> <option value='MIN' selected >MIN</option></select>";

	if (parhst[ppt].smooth) {
		htmlcont += " <button id='IDSMOOTH' title='Add Random Decimals' style='color:black' onclick='setsmooth()'><B>ARD</b></button>";
	} else {
		htmlcont += " <button id='IDSMOOTH' title='Add Random Decimals' style='color:gray' onclick='setsmooth()'>ARD</button>";
	}

	if (parhst[ppt].logdis) {
		htmlcont += " <button id='IDLOGDIS' title='Y-Axis: logarithmic scale' style='color:black' onclick='setlogdis()'><B>Log</b></button>";
	} else {
		htmlcont += " <button id='IDLOGDIS' title='Y-Axis: linear scale' style='color:gray' onclick='setlogdis()'>Lin</button>";
	}

	str = " <select id='IDSSHAPE' style='color:" + parhst[ppt].fgcolor + "; background-color:" + parhst[ppt].bgcolor + "' onchange='setshape()'>\n";
	if (parhst[ppt].sshape == 'linear') str += "<option value='linear' selected > linear </option> \n";
	else str += "<option value='linear' > linear </option>";
	if (parhst[ppt].sshape == 'spline') str += "<option value='spline' selected > spline </option> \n";
	else str += "<option value='spline' > spline </option>";
	if (parhst[ppt].sshape == 'hvh') str += "<option value='hvh' selected > steps </option> \n";
	else str += "<option value='hvh' > steps </option>";
	str += "</select>";
	htmlcont += str;

	if (infile != null) htmlcont += " <button id='IDbutret' style='color:gray' onclick='reprocess()'><i>go back</i></button>";
	htmlcont += " <button title='Set Chart and Axis Title(s)' onclick='settitle()'>Title</button>";
	htmlcont += " <button id='ID+' title='Increase font size' onclick='incfonts()'>+</button><button id='ID-' title='Decrease font size' onclick='decfonts()'>-</button>";

	htmlcont += " <button id='IDEXP' title='Export Configuration Settings \n(hold Shift-Key to export Data Container)' onclick='expset()'>Exp.</button><button id='IDIMP' title='Import Configuration Settings \n(hold Shift-Key to import Data Container)' onclick='impset()'>Imp.</button>";

	htmlcont += "<button id='IDDECHST' title='revert back to previous settings' onclick='dechist()'> &lt; </button>";
	htmlcont += "<button id='IDLOAD' title='Load Settings' onclick='loadhist()'>Load</button>";
	htmlcont += "<button id='IDDEFAULT' title='Set Default Settings' onclick='savedefault()'>Default</button>";
	htmlcont += "<button id='IDSAVE' title='Save Settings' onclick='savehist()'>Save</button>";
	htmlcont += "<button id='IDINCHST' title='forward to next settings' onclick='inchist()'> &gt; </button>";
	

	if (autohide) {
		htmlcont += " <a href='#' id='IDautohide' onclick='toggleautohide()'><small><i>Hide</i></small></a> ";
	} else {
		htmlcont += " <a href='#' id='IDautohide' onclick='toggleautohide()'><small><i>Show</i></small></a> ";
	}
	
	htmlcont += " <a href='#' title='Help & Documentation' onclick='check4update()'><small><i>Help</i></small></a>  ";

	// style='background:lightgray; margin:0px; padding:0px;'
	htmlcont += " </td></tr></table>";

	document.getElementById('IDload').innerHTML = htmlcont;

	document.addEventListener("keypress", onKeyPress, false);
	document.addEventListener("keydown", onKeyDown, false);
	document.addEventListener("keyup", onKeyUp, false);

	if (ppt < 1) document.getElementById("IDDECHST").disabled = true;
	if (ppt == parhst.length - 1) document.getElementById("IDINCHST").disabled = true;

	switch (parhst[ppt].stsel) {
		case 'ADD':
			document.getElementById("IDBHST").disabled = false;
			break;
		case 'STK':
			document.getElementById("IDBHST").disabled = false;
			break;
		case 'IND':
			document.getElementById("IDBHST").disabled = true;
			break;
	}

	if (parhst[ppt].vstack !== "") {
		// if (parhst[ppt].grtype !== "bar") parhst[ppt].maxpnt = data.length;
		document.getElementById("IDBHST").disabled = true;
		if (parhst[ppt].stsel == "STK") {
			showhide(true);
			document.getElementById("IDBHST").disabled = true;
		} else {
			document.getElementById("IDBHST").disabled = false;
		}
	}

	if (parhst[ppt].logdis) {
		// document.getElementById('IDYTMIN').readOnly  = true; 
		// document.getElementById('IDYTMAX').readOnly  = true;
	} else {
		document.getElementById('IDYTMIN').readOnly = false;
		document.getElementById('IDYTMAX').readOnly = false;
	}

	if (start) {
		graphic();
	}
}

function onKeyPress(e) {
	// HotKeys
	var x = e.keyCode;
	// if (x == 60) dechist(); // < Key
	// if (x == 62) inchist(); // > Key
}

function onKeyDown(e) {
	// HotKeys
	var x = e.keyCode;
	if (x == 119) graphic(); // F8 Key
	if (x == 16) {
		keyshift = true;
		document.getElementById('IDEXP').innerHTML = "<b style='color:blue'>Exp.</b>";
	}
}

function onKeyUp(e) {
	// HotKeys
	var x = e.keyCode;
	if (x == 16) {
		keyshift = false;
		document.getElementById('IDEXP').innerHTML = "Exp.";
	}
}

function incfonts() {
	// increment font size of graphic
	addhist();
	parhst[ppt].cfonts += 1;
	parhst[ppt].afonts += 1;
	parhst[ppt].tfonts += 1;
	parameters();
	graphic();
}

function decfonts() {
	// decrement font size of graphic
	addhist();
	parhst[ppt].cfonts -= 1;
	parhst[ppt].afonts -= 1;
	parhst[ppt].tfonts -= 1;
	parameters();
	graphic();
}

function dechist() {
	// go back in history 
	ppt = ppt - 1;
	if (ppt < 0) ppt = 0;
	parhst[ppt].Gw = 0;
	setparam();
	parameters();
	graphic();
}

function inchist() {
	// forward in history
	ppt = ppt + 1;
	if (ppt == parhst.length) ppt = parhst.length - 1;
	parhst[ppt].Gw = 0;
	setparam();
	parameters();
	graphic();
}

function setparam() {
	// set parameters on screen
	document.getElementById('IDX1').value = parhst[ppt].selx1;
	document.getElementById('IDX2').value = parhst[ppt].selx2;
	document.getElementById('IDX3').value = parhst[ppt].selx3;
	document.getElementById('IDX4').value = parhst[ppt].selx4;
	document.getElementById('IDFX').value = parhst[ppt].selfx;
	document.getElementById('IDY1').value = parhst[ppt].sely1;
	document.getElementById('IDY2').value = parhst[ppt].sely2;
	document.getElementById('IDY3').value = parhst[ppt].sely3;
	document.getElementById('IDY4').value = parhst[ppt].sely4;
	document.getElementById('IDFC').value = parhst[ppt].selfc;
	document.getElementById('IDVSTACK').value = parhst[ppt].vstack;
	document.getElementById('IDXMIN').value = parhst[ppt].xinpmin;
	document.getElementById('IDHSTMIN').value = parhst[ppt].hstinpmin;
	document.getElementById('IDXMAX').value = parhst[ppt].xinpmax;
	document.getElementById('IDHSTMAX').value = parhst[ppt].hstinpmax;
	document.getElementById('IDSROUND').value = parhst[ppt].sround;
	document.getElementById('IDSSHAPE').value = parhst[ppt].sshape;
	document.getElementById('IDFILTER').value = parhst[ppt].filter;
	document.getElementById('IDSO').value = parhst[ppt].selopt;
	document.getElementById('IDSCNT').value = parhst[ppt].scnt;
	document.getElementById('IDYTMIN').value = parhst[ppt].ytmin;
	document.getElementById('IDYTMAX').value = parhst[ppt].ytmax;
	document.getElementById('IDFACT').value = parhst[ppt].fact;
	document.getElementById('IDGRTYPE').value = parhst[ppt].grtype;
	document.getElementById('IDSTSEL').value = parhst[ppt].stsel;
	document.getElementById('IDOPR').value = parhst[ppt].opr;
	document.getElementById('IDMAXPNT').value = parhst[ppt].maxpnt;
	document.getElementById('IDDTSIZE').value = parhst[ppt].dtsize;
	document.getElementById('IDAVGINT').value = parhst[ppt].avgint;
	document.getElementById('IDSMOOTH').value = parhst[ppt].smooth;
  document.getElementById('IDopaci').value = parhst[ppt].opaci;
  if (parhst[ppt].sndyaxis) {
		document.getElementById('IDZ1').value = parhst[ppt].selz1;
		document.getElementById('IDZ2').value = parhst[ppt].selz2;
		document.getElementById('IDZ3').value = parhst[ppt].selz3;
		document.getElementById('IDZ4').value = parhst[ppt].selz4;
		document.getElementById('IDZTMIN').value = parhst[ppt].ztmin;
		document.getElementById('IDZTMAX').value = parhst[ppt].ztmax;
    document.getElementById('IDGRZTYPE').value = parhst[ppt].grztype;
	  document.getElementById('IDZLOGDIS').value = parhst[ppt].zlogdis;
	  document.getElementById('IDZSHAPE').value = parhst[ppt].zshape;
	  document.getElementById('IDpzcolor').value = parhst[ppt].pzcolor;
	  document.getElementById('IDZTSIZE').value = parhst[ppt].ztsize;
	  document.getElementById('IDzopac').value = parhst[ppt].zopac;
  }
}

function addhist() {
	// add entry to history table 
	var tmp = parhst[ppt];
	var cnt = ppt + 1;
	while (parhst.length > cnt) {
		parhst.pop();
	}
	if (parhst[ppt].ustat == true) {
		// increment parameter history
		parhst[parhst.length] = {
			ustat: false,
			selx1: tmp.selx1,
			selx2: tmp.selx2,
			selx3: tmp.selx3,
			selx4: tmp.selx4,
			selfx: tmp.selfx,
			sely1: tmp.sely1,
			sely2: tmp.sely2,
			sely3: tmp.sely3,
			sely4: tmp.sely4,
			selfc: tmp.selfc,
			vstack: tmp.vstack,
			xinpmin: tmp.xinpmin,
			hstinpmin: tmp.hstinpmin,
			xinpmax: tmp.xinpmax,
			hstinpmax: tmp.hstinpmax,
			xdtick: tmp.xdtick,
			tround: tmp.tround,
			sround: tmp.sround,
			cleand: tmp.cleand,
			sshape: tmp.sshape,
			filter: tmp.filter,
			selopt: tmp.selopt,
			scnt: tmp.scnt,
			ytmin: tmp.ytmin,
			ytmax: tmp.ytmax,
			fact: tmp.fact,
			logdis: tmp.logdis,
			grtype: tmp.grtype,
			stsel: tmp.stsel,
			opr: tmp.opr,
			maxpnt: tmp.maxpnt,
			dtsize: tmp.dtsize,
			avgint: tmp.avgint,
			Gw: tmp.Gw,
			Hw: tmp.Hw,
			SGw: tmp.SGw,
			SHw: tmp.SHw,
			gtitle: tmp.gtitle,
			xtitle: tmp.xtitle,
			ytitle: tmp.ytitle,
			smooth: tmp.smooth,
			cfonts: tmp.cfonts,
			afonts: tmp.afonts,
			tfonts: tmp.tfonts,
			datind: tmp.datind,
			showhist: tmp.showhist,
			bgcolor: tmp.bgcolor,
			chcolor: tmp.chcolor,
			fgcolor: tmp.fgcolor,
			grcolor: tmp.grcolor,
			ptcolor: tmp.ptcolor,
			p1color: tmp.p1color,
			p2color: tmp.p2color,
			p3color: tmp.p3color,
			colsc: [
				[tmp.colsc[0][0], tmp.colsc[0][1]],
				[tmp.colsc[1][0], tmp.colsc[1][1]],
				[tmp.colsc[2][0], tmp.colsc[2][1]],
				[tmp.colsc[3][0], tmp.colsc[3][1]]
			],
			selz1: tmp.selz1,
			selz2: tmp.selz2,
			selz3: tmp.selz3,
			selz4: tmp.selz4,
			ztmin: tmp.ztmin,
			ztmax: tmp.ztmax,
    	grztype: tmp.grztype,
	    zlogdis: tmp.zlogdis,
	    pzcolor: tmp.pzcolor,
	    ztsize: tmp.ztsize,
	    sndyaxis: tmp.sndyaxis,
	    opaci: tmp.opaci,
	    zopac: tmp.zopac
		};
		ppt = parhst.length - 1;
	}
}

function toggleautohide() {
	// show/hide menu
	if (autohide) {
		autohide = false;
		document.getElementById("IDautohide").innerHTML = "<small><i>Show</i></small>";
		sheight = 0.75;
	} else {
		autohide = true;
		document.getElementById("IDautohide").innerHTML = "<small><i>Hide</i></small>";
		sheight = 0.90;
	}
}

function setlogdis() {
	// toggle between logarithmic and linear axis
	addhist();
	if (parhst[ppt].logdis) {
		parhst[ppt].logdis = false;
	} else {
		parhst[ppt].logdis = true;
	}
	reset();
}

function setzlogdis() {
	// toggle between logarithmic and linear axis
	addhist();
	if (parhst[ppt].zlogdis) {
		parhst[ppt].zlogdis = false;
	} else {
		parhst[ppt].zlogdis = true;
	}
	reset();
}

function setsmooth() {
	// toggle adding random decimals
	addhist();
	if (parhst[ppt].smooth) {
		parhst[ppt].smooth = false;
	} else {
		parhst[ppt].smooth = true;
	}
	parameters();
	graphic();
}

function toggle2ndaxis() {
	// toggle adding random decimals
	addhist();
	if (parhst[ppt].sndyaxis) {
		parhst[ppt].sndyaxis = false;
		parhst[ppt].selz1 = "";
		parhst[ppt].selz2 = "";
		parhst[ppt].selz3 = "";
		parhst[ppt].selz4 = "";
	} else {
		parhst[ppt].sndyaxis = true;
	}
	parameters();
	graphic();
}

function settround() {
	// toggle rounding on/off
	addhist();
	if (parhst[ppt].tround) {
		parhst[ppt].tround = false;
	} else {
		parhst[ppt].tround = true;
	}
	parameters();
	graphic();
}

function setcleand() {
	// 
	addhist();
	if (parhst[ppt].cleand) {
		parhst[ppt].cleand = false;
	} else {
		parhst[ppt].cleand = true;
	}
	parameters();
	graphic();
}

function setsround() {
	// get rounding value
	addhist();
	parhst[ppt].sround = document.getElementById("IDSROUND").value;
	if (parhst[ppt].tround) {
		parameters();
		graphic();
	}
}

function graphmode() {
	// set graph mode (Scatter, Line, Bar, Area)
	addhist();
	parhst[ppt].grtype = document.getElementById("IDGRTYPE").value;
	switch (parhst[ppt].grtype) {
		case 'scatter':
			parhst[ppt].dtsize = 3;
			break;
		case 'line':
			parhst[ppt].dtsize = 1;
			break;
		case 'bar':
			parhst[ppt].dtsize = 1;
			parhst[ppt].maxpnt = 0;
			break;
		case 'area':
			parhst[ppt].dtsize = 1;
			break;
	}
	document.getElementById("IDDTSIZE").value = parhst[ppt].dtsize;
	document.getElementById("IDMAXPNT").value = parhst[ppt].maxpnt;
	parameters();
	graphic();
}

function graphzmode() {
	// set graph mode (Scatter, Line, Bar, Area)
	addhist();
	parhst[ppt].grztype = document.getElementById("IDGRZTYPE").value;
	switch (parhst[ppt].grztype) {
		case 'scatter':
			parhst[ppt].ztsize = 3;
			break;
		case 'line':
			parhst[ppt].ztsize = 1;
			break;
		case 'area':
			parhst[ppt].ztsize = 1;
			break;
	}
	document.getElementById("IDDTSIZE").value = parhst[ppt].dtsize;
	document.getElementById("IDZTSIZE").value = parhst[ppt].ztsize;
	document.getElementById("IDMAXPNT").value = parhst[ppt].maxpnt;
	parameters();
	graphic();
}

function stackmode() {
	// set Stack Mode
	addhist();
	parhst[ppt].stsel = document.getElementById("IDSTSEL").value;
	changex();
	document.getElementById("IDYTMIN").value = "";
	document.getElementById("IDYTMAX").value = "";
	if (parhst[ppt].stsel == 'ADD') {
		showhide(false);
		slegend = false;
		if (parhst[ppt].grtype == 'line') parhst[ppt].dtsize = 1;
		if (parhst[ppt].grtype == 'scatter') parhst[ppt].dtsize = 3;
	} else if (parhst[ppt].stsel == 'IND') {
		showhide(true);
		slegend = true;
		parhst[ppt].dtsize = 1;
	} else if (parhst[ppt].stsel == 'STK') {
		showhide(false);
		slegend = true;
		if (parhst[ppt].grtype == 'scatter') parhst[ppt].grtype = 'area';
		parhst[ppt].dtsize = 1;
	}
	document.getElementById("IDGRTYPE").value = parhst[ppt].grtype;
	document.getElementById("IDDTSIZE").value = parhst[ppt].dtsize;
	parameters();
	graphic();

}

function showhide(value = "") {
	// toggle show/hide histogram
	if (value !== "" && parhst[ppt].showhist !== value) {
		parhst[ppt].showhist = value;
		addhist();
	}
	if (parhst[ppt].showhist) {
		parhst[ppt].showhist = false;
		parhst[ppt].SGw = parhst[ppt].Gw;
		parhst[ppt].SHw = parhst[ppt].Hw;
	} else {
		parhst[ppt].showhist = true;
		parhst[ppt].Gw = parhst[ppt].SGw;
		parhst[ppt].Hw = parhst[ppt].SHw;
	}
	if (value == "") {
		parameters();
		graphic();
	}
}

function getthsval() {
	// Read Histogram Threshold and Color Values
	addhist();
	parhst[ppt].colsc[0][0] = parseFloat(document.getElementById("IDth1").value);
	parhst[ppt].colsc[1][0] = parseFloat(document.getElementById("IDth2").value);
	parhst[ppt].colsc[2][0] = parseFloat(document.getElementById("IDth3").value);
	parhst[ppt].colsc[0][1] = document.getElementById("IDco1").value;
	parhst[ppt].colsc[1][1] = document.getElementById("IDco2").value;
	parhst[ppt].colsc[2][1] = document.getElementById("IDco3").value;
	parhst[ppt].colsc[3][1] = document.getElementById("IDco4").value;
	if (parhst[ppt].colsc[0][0] > parhst[ppt].colsc[1][0]) {
		parhst[ppt].colsc[1][0] = parseFloat(parhst[ppt].colsc[0][0]) + 1;
		parhst[ppt].colsc[1][0] = Number(parhst[ppt].colsc[1][0]);
	}
	if (parhst[ppt].colsc[1][0] > parhst[ppt].colsc[2][0]) {
		parhst[ppt].colsc[2][0] = parseFloat(parhst[ppt].colsc[1][0]) + 1;
		parhst[ppt].colsc[2][0] = Number(parhst[ppt].colsc[2][0]);
	}
	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
}

function setbgcol() {
	// Set Background Color
	addhist();
	parhst[ppt].bgcolor = document.getElementById("IDbgcolor").value;

	document.body.style.backgroundColor = parhst[ppt].bgcolor;
	var c = parhst[ppt].bgcolor.substring(1); // strip #
	var rgb = parseInt(c, 16); // convert rrggbb to decimal
	var r = (rgb >> 16) & 0xff; // extract red
	var g = (rgb >> 8) & 0xff; // extract green
	var b = (rgb >> 0) & 0xff; // extract blue
	var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	if (luma < 100) {
		parhst[ppt].fgcolor = '#ffffff';
		parhst[ppt].grcolor = '#222222';
		parhst[ppt].ptcolor = '#888888';
		parhst[ppt].chcolor = rgbmean(parhst[ppt].bgcolor, 1.2);
	} else {
		parhst[ppt].fgcolor = '#222222';
		parhst[ppt].grcolor = '#DDDDDD';
		parhst[ppt].ptcolor = '#002E7A';
		parhst[ppt].chcolor = rgbmean(parhst[ppt].bgcolor, 0.98);
	}
	document.body.style.color = parhst[ppt].fgcolor;
	parameters();
	graphic();
}

function setptcol() {
	// set point colors
	addhist();
	parhst[ppt].ptcolor = document.getElementById("IDptcolor").value;
	parhst[ppt].p1color = document.getElementById("IDp1color").value;
	parhst[ppt].p2color = document.getElementById("IDp2color").value;
	parhst[ppt].p3color = document.getElementById("IDp3color").value;
	parhst[ppt].pzcolor = document.getElementById("IDpzcolor").value;
	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
}

function setchcol() {
	// set chart colour
	addhist();
	parhst[ppt].chcolor = document.getElementById("IDchcolor").value;
	parameters();
	document.title = 'Data Analysis - graphic refresh pending ... ';
	document.getElementById("IDDOT").className = "dotyel";
	parameters();
	graphic();
}

function setshape() {
	// set shape (linear, spline, steps)
	addhist();
	parhst[ppt].sshape = document.getElementById("IDSSHAPE").value;
	parhst[ppt].zshape = document.getElementById("IDZSHAPE").value;
	parameters();
	graphic();
}

function convdate(value) {
	// convert date into target format YYYY-MM-DD - because the date does not change often - therefore we try to buffer the regex.match result
	if (typeof convdate.date == 'undefined') {
		// It has not... perform the initialization
		convdate.date = "";
		convdate.m = [];
		convdate.r = "";
		convdate.regex = dtfrm[parhst[ppt].datind][2];
	}
	if (convdate.date == value) return convdate.r;
	convdate.date = value;
	convdate.m = value.match(convdate.regex);
	try {
		switch (parhst[ppt].datind) {
			case "0":
				convdate.r = convdate.m[1] + '-' + convdate.m[2] + '-' + convdate.m[3]; return convdate.r;
			case "1":
				convdate.r = convdate.m[3] + '-' + convdate.m[2] + '-' + convdate.m[1]; return convdate.r;
			case "2":
				convdate.r = '20' + convdate.m[1] + '-' + convdate.m[2] + '-' + convdate.m[3]; return convdate.r;
			case "3":
				convdate.r = '20' + convdate.m[3] + '-' + convdate.m[2] + '-' + convdate.m[1]; return convdate.r;
			case "4":
				convdate.r = convdate.m[1] + '-' + convdate.m[3] + '-' + convdate.m[2]; return convdate.r;
			case "5":
				convdate.r = convdate.m[3] + '-' + convdate.m[1] + '-' + convdate.m[2]; return convdate.r;
			case "6":
				convdate.r = '20' + convdate.m[1] + '-' + convdate.m[3] + '-' + convdate.m[2]; return convdate.r;
			case "7":
				convdate.r = '20' + convdate.m[3] + '-' + convdate.m[1] + '-' + convdate.m[2]; return convdate.r;
		}
	} catch (err) {}
}

function roundtime(value, mode) {
	// round time to give value 
	var t = [];
	t = value.split(':');
	if (mode) {
		var time = parseInt(t[0]) * 3600 + parseInt(t[1]) * 60 + parseInt(t[2]);
		time = Math.trunc(time / parhst[ppt].sround) * parhst[ppt].sround;
		t[0] = Math.trunc(time / 3600);
		t[1] = Math.trunc((time - t[0] * 3600) / 60);
		t[2] = Math.trunc((time - t[0] * 3600 - t[1] * 60));
	}
	return '' + pad(t[0], 2) + ':' + pad(t[1], 2) + ':' + pad(t[2], 2);
}

function convtime(value) {
	// test time formats HH:MM:SS or HH:MM
	if (typeof convtime.timeformat == 'undefined') {
		// It has not... perform the initialization
		convtime.timeformat = false;
		convtime.pvalue = "";
		convtime.presult = "";
	}
	if (value == convtime.pvalue) return convtime.presult;
	convtime.pvalue = value;
	// var regex =  /(\d{1,2}):(\d{2}):(\d{2})/;
	var regex = /(\d{2}):(\d{2}):(\d{2})/;
	if (convtime.timeformat || regex.test(value)) {
		if (parhst[ppt].tround) { convtime.presult = roundtime(value, true); return convtime.presult; }
		else { convtime.presult = value; return convtime.presult; }
	}
	regex = /(\d{1,2}):(\d{1,2}):(\d{1,2})/;
	if (regex.test(value)) {
		if (parhst[ppt].tround) { convtime.presult = roundtime(value, true); return convtime.presult; }
		else { convtime.presult = roundtime(value, false); return convtime.presult; }
	}
	regex = /(\d{1,2}):(\d{2}):/;
	if (regex.test(value)) {
		var t = value.split(':');
		var nt = '' + pad(t[0], 2) + ':' + pad(t[1], 2);
		if (parhst[ppt].tround) { convtime.presult = roundtime(nt, true); return convtime.presult; }
		else { convtime.presult = roundtime(nt, false); return convtime.presult; }
	}
}

//		function beep(duration, frequency, volume, type, callback) {
//			var oscillator = audioCtx.createOscillator();
//			var gainNode = audioCtx.createGain();
//		
//			oscillator.connect(gainNode);
//			gainNode.connect(audioCtx.destination);
//		
//			if (volume) {
//				gainNode.gain.value = volume;
//			}
//			if (frequency) {
//				oscillator.frequency.value = frequency;
//			}
//			if (type) {
//				oscillator.type = type;
//			}
//			if (callback) {
//				oscillator.onended = callback;
//			}
//		
//			oscillator.start();
//			setTimeout(function () {
//				oscillator.stop();
//			}, (duration ? duration : 1));
//		}

function rgbmean(rgb1, x1) {
	// change brightness of given RGB value
	var tmp2 = parseInt(rgb1.slice(1), 16);

	var r1 = (tmp2 >> 16) & 0xff;
	var g1 = (tmp2 >> 8) & 0xff;
	var b1 = (tmp2 >> 0) & 0xff;

	if (r1 == 0 && g1 == 0 && b1 == 0) return rgb1;
	if (r1 == 255 && g1 == 255 && b1 == 255) return rgb1;

	var r = Math.trunc((r1 * x1));
	var g = Math.trunc((g1 * x1));
	var b = Math.trunc((b1 * x1));

	var str = '#' + ("0" + parseInt(r, 10).toString(16)).slice(-2) +
		("0" + parseInt(g, 10).toString(16)).slice(-2) +
		("0" + parseInt(b, 10).toString(16)).slice(-2);
	return str;
}

function rgbint(factor, max) {
	// change brightness of given RGB value
	var tmp1 = parseInt(parhst[ppt].ptcolor.slice(1), 16);
	var tmp2 = parseInt(parhst[ppt].p1color.slice(1), 16);
	var tmp3 = parseInt(parhst[ppt].p2color.slice(1), 16);
	var tmp4 = parseInt(parhst[ppt].p3color.slice(1), 16);

	var r1 = (tmp1 >> 16) & 0xff;
	var g1 = (tmp1 >> 8) & 0xff;
	var b1 = (tmp1 >> 0) & 0xff;

	var r2 = (tmp2 >> 16) & 0xff;
	var g2 = (tmp2 >> 8) & 0xff;
	var b2 = (tmp2 >> 0) & 0xff;

	var r3 = (tmp3 >> 16) & 0xff;
	var g3 = (tmp3 >> 8) & 0xff;
	var b3 = (tmp3 >> 0) & 0xff;

	var r4 = (tmp4 >> 16) & 0xff;
	var g4 = (tmp4 >> 8) & 0xff;
	var b4 = (tmp4 >> 0) & 0xff;

var r = 0;
var g = 0;
var b = 0;

	factor = factor / max;

	if (factor < 0.333) {
		factor = factor * 3;
		r = Math.trunc((r2 - r1) * factor + r1);
		g = Math.trunc((g2 - g1) * factor + g1);
		b = Math.trunc((b2 - b1) * factor + b1);
	} else if (factor >= 0.333 && factor < 0.666) {
		factor = (factor - 0.333) * 3;
		r = Math.trunc((r3 - r2) * factor + r2);
		g = Math.trunc((g3 - g2) * factor + g2);
		b = Math.trunc((b3 - b2) * factor + b2);
	} else {
		factor = (factor - 0.666) * 3;
		r = Math.trunc((r4 - r3) * factor + r3);
		g = Math.trunc((g4 - g3) * factor + g3);
		b = Math.trunc((b4 - b3) * factor + b3);
	}

	var str = '#' + ("0" + parseInt(r, 10).toString(16)).slice(-2) +
		("0" + parseInt(g, 10).toString(16)).slice(-2) +
		("0" + parseInt(b, 10).toString(16)).slice(-2);
	return str;
}

function check4update() {
	// open JAM page
	window.open("https://jam4.sapjam.com/blogs/show/bavz22yEdmzrd4PHAGU3Yh");
}

function decnot() {
	// get decimal notation
	if (decpnt == '.') {
		decpnt = ',';
		document.getElementById('IDdecnot').innerHTML = "Dec.Notation: 1.023.045<font style='color:red;font-size:16px;'>,</b></font>06";
	} else if (decpnt == ',') {
		decpnt = '.';
		document.getElementById('IDdecnot').innerHTML = "Dec.Notation: 1,023,045<font style='color:red;font-size:16px;'><b>.</b></font>06";
	}
}

function tabkey(evt) {
	// use TAB key within textarea
	if (evt.keyCode === 9 && evt.shiftKey && !evt.ctrlKey && !evt.altKey) {
		var v = document.getElementById('IDtextarea').value;
		var s = document.getElementById('IDtextarea').selectionStart;
		var e = document.getElementById('IDtextarea').selectionEnd;
		document.getElementById('IDtextarea').value = v.substring(0, s) + '\t' + v.substring(e);
		document.getElementById('IDtextarea').selectionStart = document.getElementById('IDtextarea').selectionEnd = s + 1;
		evt.preventDefault();
		return false;
	}
}

function stack(vdat) {
	// sort VDAT by stack & X-values (numeric or text)
	vdat.sort(function(a, b) {
		var t1 = a.s + a.x;
		var t2 = b.s + b.x;
		if (t1 < t2) {
			return -1;
		}
		if (t1 > t2) {
			return 1;
		}
		return 0;
	});

	var x = 0;
	var i = 0;

	sdat = [];

	sdat[0] = {
		s: vdat[0].s, // stack value
		// y: 0,           // y value
		x: 0 // Index first X-Value
	};

	// cumulate SDAT - add y values
	for (x = 0; x < vdat.length; x++) {
		if (vdat[x].s !== sdat[i].s) {
			i += 1;
			sdat[i] = {
				s: vdat[x].s, // stack value
				x: x // Index first X-Value
			};
		}
	}

	if (sdat.length > 99) {
		parhst[ppt].scnt = 99;
		document.getElementById('IDSCNT').value = 99;
	}

	// sort by Y-values descending (numeric or text)
	sdat.sort(function(a, b) {
		var t1 = a.s;
		var t2 = b.s;
		if (isNaN(t1) || isNaN(t2)) {
			if (t1 < t2) {
				return -1;
			}
			if (t1 > t2) {
				return 1;
			}
			return 0;
		} else {
			var n1 = parseFloat(t1);
			var n2 = parseFloat(t2);
			if (n1 < n2) {
				return -1;
			}
			if (n1 > n2) {
				return 1;
			}
			return 0;
		}
	});

	// remove entries 
	if (parhst[ppt].scnt > 0) {
		for (x = sdat.length; x > 0; x--) {
			if (x >= parhst[ppt].scnt) {
				sdat.splice(x, 1);
			}
		}
	}

}

function CleanData() {
	//  remove data points which are not equally present in all stacks
	if (parhst[ppt].vstack !== "" && parhst[ppt].stsel == "STK" || (parhst[ppt].vstack !== "" && !(parhst[ppt].vstack == parhst[ppt].selx1 || parhst[ppt].vstack == parhst[ppt].selx2 || parhst[ppt].vstack == parhst[ppt].selx3 || parhst[ppt].vstack == parhst[ppt].selx4))) {

		var c = 0;
		var g = 0;
		var t = 0;
		var n = 0;
		var f = false;
		var msg = "";
  var cdat = [];
  var gdat = [];
  var tdat = [];
  

		if (!parhst[ppt].cleand) {
			// add missing data points
			cdat = [];
			cdat[0] = {
				x: vdat[0].x,
				c: 0
			};
			gdat = [];
			gdat[0] = {
				s: vdat[0].s,
				c: 0
			};

			// build distinct stack values 
			tdat = [];
			tdat[0] = {
				s: vdat[0].s,
				c: 0
			};
			for (n = 0; n < vdat.length; n++) {
				f = false;
				for (t = 0; t < tdat.length; t++) {
					if (tdat[t].s == vdat[n].s) {
						f = true;
						tdat[t].c += 1;
						break;
					}
				}
				if (f == false) {
					tdat[tdat.length] = {
						s: vdat[n].s,
						c: 1
					};
				}
			}

			// sort 
			tdat.sort(function(a, b) {
				var t1 = a.s;
				var t2 = b.s;
				if (t1 < t2) {
					return -1;
				}
				if (t1 > t2) {
					return 1;
				}
				return 0;
			});

			// count total number of data points for each X-Value
			for (n = 0; n < vdat.length; n++) {
				if (vdat[n].x == cdat[c].x) {

				} else {
					c += 1;
					cdat[c] = {
						x: vdat[n].x,
						c: 1
					};
				}
			}

			// sort 
			cdat.sort(function(a, b) {
				var t1 = a.x;
				var t2 = b.x;
				if (t1 < t2) {
					return -1;
				}
				if (t1 > t2) {
					return 1;
				}
				return 0;
			});

			// add missing entries with zero value
			for (c = 0; c < cdat.length; c++) {
				for (t = 0; t < tdat.length; t++) {
					n = c * tdat.length + t;
					if (n > vdat.length - 1 || vdat[n].s !== tdat[t].s || vdat[n].x !== cdat[c].x) {
						vdat.splice(n, 0, {
							s: tdat[t].s, // stack value
							x: cdat[c].x, // X-Values
							c: 0, // Counter for averages
							y1: 0, // 1st y value
							y2: 0, // 2nd y value
							y3: 0, // 3rd y value
							y4: 0 // 4th y value
						});
					}

				}
			}

		} else {
			// delete data point not present in all stack groups
			cdat = [];
			cdat[0] = {
				x: vdat[0].x,
				c: 0
			};
			gdat = [];
			gdat[0] = {
				s: vdat[0].s,
				c: 0
			};

			// build distinct stack values 
			tdat = [];
			tdat[0] = {
				s: vdat[0].s,
				c: 0
			};
			for (n = 0; n < vdat.length; n++) {
				f = false;
				for (t = 0; t < tdat.length; t++) {
					if (tdat[t].s == vdat[n].s) {
						f = true;
						tdat[t].c += 1;
						break;
					}
				}
				if (f == false) {
					tdat[tdat.length] = {
						s: vdat[n].s,
						c: 1
					};
				}
			}
			var tavg = 0;
			var tsum = 0;
			var tcnt = 0;
			for (n = 0; n < tdat.length; n++) {
				tsum += tdat[n].c;
				tcnt += 1;
			}
			tavg = tsum / tcnt;
			tsum = tcnt = 0;
			for (n = 0; n < tdat.length; n++) {
				if (tdat[n].c > tavg * 0.80 || tdat[n] < tavg * 1.20) {
					tsum += tdat[n].c;
					tcnt += 1;
				}
			}
			tavg = tsum / tcnt;
			n = 0;
			while (true) {
				if (tdat[n].c < tavg * 0.80 || tdat[n] > tavg * 1.20) {
					tdat.splice(n, 1);
				} else {
					tdat[n].c = 0;
					n += 1;
				}
				if (n == tdat.length) break;
			}

			// sort descending (numeric or text)
			tdat.sort(function(a, b) {
				var t1 = a.s;
				var t2 = b.s;
				if (t1 < t2) {
					return -1;
				}
				if (t1 > t2) {
					return 1;
				}
				return 0;
			});

			// count total number of data points for each X-Value
			for (n = 0; n < vdat.length; n++) {
				if (vdat[n].x == cdat[c].x) {
					cdat[c].c += 1;
					f = false;

					for (g = 0; g < gdat.length; g++) {
						if (gdat[g].s == vdat[n].s) {
							f = true;
							break;
						}
					}
					if (f == false) {
						gdat[gdat.length] = {
							s: vdat[n].s,
							c: 0
						};
					}
				} else {
					if (JSON.stringify(gdat) !== JSON.stringify(tdat)) {
						cdat[c].c = 0;
					}
					c += 1;
					cdat[c] = {
						x: vdat[n].x,
						c: 1
					};
					gdat = [];
					gdat[0] = {
						s: vdat[n].s,
						c: 0
					};
				}
			}
			// Calculate max number of data points for each X-Value
			var nmax = 0;
			for (n = 0; n < cdat.length; n++) {
				if (cdat[n].c > nmax) nmax = cdat[n].c;
			}

			// remove x-Values which have less than max data points
			n = 0;
			while (true) {
				if (cdat[n].c !== nmax) {
					cdat.splice(n, 1);
					if (n == cdat.length) break;
				} else {
					n += 1;
					if (n == cdat.length) break;
				}
			}

			var v = 0;
			c = 0;

			// remove data points which are not present in all stack groups
			while (true) {
				var found = false;
				if (vdat[v].x !== cdat[c].x) {
					for (n = c; n < cdat.length; n++) {
						if (vdat[v].x == cdat[n].x) {
							c = n;
							found = true;
							break;
						}
						if (cdat[n].x > vdat[v].x) break;
					}
				}
				if (vdat[v].x !== cdat[c].x) {
					vdat.splice(v, 1);
					if (v == vdat.length) break;
				} else {
					v += 1;
					if (v == vdat.length) break;
				}
			}
		}

		if (vdat.length == 0) alert("Stack values not possible - no matching x-values found");

		gdat = null;
		tdat = null;
		cdat = null;

		console.log(msg);

	}
}

function AgregateData() {
	// aggregate Data Points
	var ind = 0;
	var tdat = [];
	var n = 0;
	for (n = 0; n < vdat.length; n++) {

		if (n > 0 && tdat[ind].x == vdat[n].x && tdat[ind].s == vdat[n].s) {
			var fltp = 0;
			if (parhst[ppt].opr == "MAX") {
				if ((fltp = vdat[n].y1) > tdat[ind].y1) tdat[ind].y1 = vdat[n].y1;
				if ((fltp = vdat[n].y2) > tdat[ind].y2) tdat[ind].y2 = vdat[n].y2;
				if ((fltp = vdat[n].y3) > tdat[ind].y3) tdat[ind].y3 = vdat[n].y3;
				if ((fltp = vdat[n].y4) > tdat[ind].y4) tdat[ind].y4 = vdat[n].y4;
				if ((fltp = vdat[n].z)  > tdat[ind].z)  tdat[ind].z  = vdat[n].z;
			} else if (parhst[ppt].opr == "MIN") {
				if ((fltp = vdat[n].y1) < tdat[ind].y1) tdat[ind].y1 = vdat[n].y1;
				if ((fltp = vdat[n].y2) < tdat[ind].y2) tdat[ind].y2 = vdat[n].y2;
				if ((fltp = vdat[n].y3) < tdat[ind].y3) tdat[ind].y3 = vdat[n].y3;
				if ((fltp = vdat[n].y4) < tdat[ind].y4) tdat[ind].y4 = vdat[n].y4;
				if ((fltp = vdat[n].z)  < tdat[ind].z)  tdat[ind].z  = vdat[n].z;
			} else {
				tdat[ind].y1 += vdat[n].y1;
				tdat[ind].y2 += vdat[n].y2;
				tdat[ind].y3 += vdat[n].y3;
				tdat[ind].y4 += vdat[n].y4;
				tdat[ind].z  += vdat[n].z;
			}
			tdat[ind].c += 1;
		} else {
			if (n > 0) {

				if (parhst[ppt].opr == "AVG") {
					if (tdat[ind].c != 0) {
						tdat[ind].y1 = tdat[ind].y1 / tdat[ind].c;
						tdat[ind].y2 = tdat[ind].y2 / tdat[ind].c;
						tdat[ind].y3 = tdat[ind].y3 / tdat[ind].c;
						tdat[ind].y4 = tdat[ind].y4 / tdat[ind].c;
						tdat[ind].z  = tdat[ind].z  / tdat[ind].c;
						tdat[ind].c = 0;
					}
				}

				ind += 1;

			}
			tdat[ind] = vdat[n];
			tdat[ind].c = 1;
		}
	}
	// calculate average for last non processed record
	try {
		if (tdat[ind].c > 0 && parhst[ppt].opr == "AVG") {
			tdat[ind].y1 = tdat[ind].y1 / tdat[ind].c;
			tdat[ind].y2 = tdat[ind].y2 / tdat[ind].c;
			tdat[ind].y3 = tdat[ind].y3 / tdat[ind].c;
			tdat[ind].y4 = tdat[ind].y4 / tdat[ind].c;
			tdat[ind].z  = tdat[ind].z  / tdat[ind].c;
			tdat[ind].c = 0;
		}
	} catch (err) {}
	vdat = tdat;
	tdat = null;

	// prevent banding > add random decimals 
	if (parhst[ppt].smooth && vdat.length >= 100) {
		var nn = 0;
		var yval = [];

		for (n = 0; n < vdat.length; n++) {
			yval[nn] = {
				y: vdat[n].y1 + vdat[n].y2 + vdat[n].y3 + vdat[n].y4
			};
			yval[nn].y = parseFloat(yval[nn].y.toPrecision(6));
			nn += 1;
			if (n > 1000) break;
		}
		// sort VDAT by y values (ascending)
		yval.sort(function(a, b) {
			var t1 = a.y;
			var t2 = b.y;
			if (t1 < t2) {
				return -1;
			}
			if (t1 > t2) {
				return 1;
			}
			return 0;
		});
		// find smallest difference between 2 values
		var mind = yval[yval.length - 1].y - yval[0].y;
		for (n = 1; n < yval.length; n++) {
			var dif = yval[n].y - yval[n - 1].y;
			dif = parseFloat(dif.toPrecision(6));
			if (dif > 0 && dif < mind) mind = dif;
		}
		mind = parseFloat(mind.toPrecision(6));
		// add random decimals
		for (n = 0; n < vdat.length; n++) {
			var rnd = Math.random() * mind;
			rnd = rnd - mind / 2;
			if (Math.abs(vdat[n].y1) >= mind) {
				vdat[n].y1 += rnd;
			}
			if (Math.abs(vdat[n].y2) >= mind) {
				vdat[n].y2 += rnd;
			}
			if (Math.abs(vdat[n].y3) >= mind) {
				vdat[n].y3 += rnd;
			}
			if (Math.abs(vdat[n].y4) >= mind) {
				vdat[n].y4 += rnd;
			}
			if (Math.abs(vdat[n].y1) == 0) {
				vdat[n].y1 += Math.random() * mind / 2;
			}
			if (Math.abs(vdat[n].y2) == 0) {
				vdat[n].y2 += Math.random() * mind / 2;
			}
			if (Math.abs(vdat[n].y3) == 0) {
				vdat[n].y3 += Math.random() * mind / 2;
			}
			if (Math.abs(vdat[n].y4) == 0) {
				vdat[n].y4 += Math.random() * mind / 2;
			}
		}
	}
}

function BuildStackGroup() {
	sdat = [];
	if (parhst[ppt].vstack !== "") stack(vdat);
	if (sdat.length == 0) {
		sdat[0] = {
			s: "", // stack value
			y: 0, // y value
			x: 0, // Index first X-Value
		};
	} else {
		// parhst[ppt].avgint = 1;
	}
}

function PrepareDefaults() {
	if (init) {
		if (parhst[ppt].grtype == "") {
			var gw = Math.trunc(window.innerWidth * 0.80 - 100);
			parhst[ppt].grtype = 'line';
			lnsize = 1;
			parhst[ppt].dtsize = 1;
			parhst[ppt].avgint = 1;
			parhst[ppt].maxpnt = Math.pow(10, Math.trunc(Math.log10(Math.abs(gw * 10))));
			if (parhst[ppt].avgint < 1) parhst[ppt].avgint = 1;
			document.getElementById("IDAVGINT").value = parhst[ppt].avgint;
			document.getElementById("IDDTSIZE").value = parhst[ppt].dtsize;
			document.getElementById("IDGRTYPE").value = 'line';
			init = false;
		}
	}

	// default histogram color intervals if empty
	if (parhst[ppt].colsc[0][0] == 0 && parhst[ppt].colsc[1][0] == 0 && parhst[ppt].colsc[2][0] == 0) {
		parhst[ppt].colsc[0][0] = average * 0.75;
		parhst[ppt].colsc[0][0] = Number(parhst[ppt].colsc[0][0].toPrecision(5));
		parhst[ppt].colsc[1][0] = average * 1.25;
		parhst[ppt].colsc[1][0] = Number(parhst[ppt].colsc[1][0].toPrecision(5));
		parhst[ppt].colsc[2][0] = average * 2.00;
		parhst[ppt].colsc[2][0] = Number(parhst[ppt].colsc[2][0].toPrecision(5));
	}
	document.getElementById("IDth1").value = parhst[ppt].colsc[0][0];
	document.getElementById("IDth2").value = parhst[ppt].colsc[1][0];
	document.getElementById("IDth3").value = parhst[ppt].colsc[2][0];

	switch (parhst[ppt].grtype) {
		case 'scatter':
			filmod = 'none';
			break;
		case 'line':
			filmod = 'none';
			break;
		case 'bar':
			filmod = 'none';
			break;
		case 'area':
			if (parhst[ppt].stsel == "STK") {
				filmod = 'tonexty';
			} else {
				filmod = 'tozeroy';
			}
			break;
	}
}

// Compact data (delete every second value for selected first X category)
function CompData() {

  if (data.length < 10000) return;

  document.getElementById("IDDOT").className = "dotred";
  
  debugger;

  var n = 0;
  var m = 0;

  var x1 = parseInt(parhst[ppt].selx1);
  
	data.sort(function(a, b) {
        var t1 = a[x1];
        var t2 = b[x1];
		return t1 < t2 ? -1 : t1 > t2 ? 1 : 0;
	});
	
	var ov = data[0][x1]
	for (n = 0; n < data.length; n++) {
	   if (data[n][x1] != ov) {
	     var tv = "" + data[n][x1];
	     while ( n < data.length && data[n][x1] == tv ) {
	         data.splice(n,1)
	     }
	     if ( n < data.length ) {
	       ov = data[n][x1];
	     }
	   }
	}
	
	graphic();
  
}

function LoadData() {

	var re = [];
	var i = 0;
	var x = 0;

	var x1 = parseInt(parhst[ppt].selx1);
	var x2 = parseInt(parhst[ppt].selx2);
	var x3 = parseInt(parhst[ppt].selx3);
	var x4 = parseInt(parhst[ppt].selx4);

	var y1 = parseInt(parhst[ppt].sely1);
	var y2 = parseInt(parhst[ppt].sely2);
	var y3 = parseInt(parhst[ppt].sely3);
	var y4 = parseInt(parhst[ppt].sely4);
	
	var z1 = parseInt(parhst[ppt].selz1);
	var z2 = parseInt(parhst[ppt].selz2);
	var z3 = parseInt(parhst[ppt].selz3);
	var z4 = parseInt(parhst[ppt].selz4);

	var fc = parseInt(parhst[ppt].selfc);

	// Prepare parhst[ppt].filter(s)
	if (parhst[ppt].filter != "") {
		var ftmp = parhst[ppt].filter.split("||");
		for (i = 0; i < ftmp.length; i++) {
			var rs = ftmp[i];
			if (!(rs.includes("?") || rs.includes("*"))) rs = "*" + rs + "*";
			rs = rs.replace(/\?/g, "\.");
			rs = rs.replace(/\*/g, "\.*");
			rs = "^" + rs;
			re[i] = new RegExp(rs);
		}
	}

	// add selected X/Y values to internal array VDAT
	var ind = 0;
	for (x = 0; x < data.length; x++) {

		var valx = "";

		tickf = "";
		if (header[parhst[ppt].selx1][1] == "n" && parhst[ppt].selx2 == "" && parhst[ppt].selx3 == "" && parhst[ppt].selx4 == "") {
			valx = parseFloat(data[x][x1]);
			tickf = "g";
		} else {
			if (parhst[ppt].selx1 !== "") {
				if (header[parhst[ppt].selx1][1] == "d") valx += " " + convdate(data[x][x1]);
				else if (header[parhst[ppt].selx1][1] == "t") valx += " " + convtime(data[x][x1]);
				else valx += " " + data[x][x1];
			}
			if (parhst[ppt].selx2 !== "") {
				if (header[parhst[ppt].selx2][1] == "d") valx += " " + convdate(data[x][x2]);
				else if (header[parhst[ppt].selx2][1] == "t") valx += " " + convtime(data[x][x2]);
				else valx += " " + data[x][x2];
			}
			if (parhst[ppt].selx3 !== "") {
				if (header[parhst[ppt].selx3][1] == "d") valx += " " + convdate(data[x][x3]);
				else if (header[parhst[ppt].selx3][1] == "t") valx += " " + convtime(data[x][x3]);
				else valx += " " + data[x][x3];
			}
			if (parhst[ppt].selx4 !== "") {
				if (header[parhst[ppt].selx4][1] == "d") valx += " " + convdate(data[x][x4]);
				else if (header[parhst[ppt].selx4][1] == "t") valx += " " + convtime(data[x][x4]);
				else valx += " " + data[x][x4];
			}
			if (header[parhst[ppt].selx1][1] == "t" && parhst[ppt].selx2 == "" && parhst[ppt].selx3 == "" && parhst[ppt].selx4 == "") {
				valx = " 2000-01-01" + valx;
				tickf = "%H:%M:%S";
			}
		}

		// check if x-Values are between XMIN and XMAX
		// if (parhst[ppt].xinpmin != "" && parhst[ppt].xinpmax != "") {
		// 	if ( valx < parhst[ppt].xinpmin || valx > parhst[ppt].xinpmax ) continue;
		// }

		// apply parhst[ppt].filter(s)
		if (parhst[ppt].selfx !== "") {
			
			var fx = parseInt(parhst[ppt].selfx);
			var valfx = "" + data[x][fx];

			if (parhst[ppt].filter != "") {
				var fres = false;
				for (i = 0; i < re.length; i++) {
					if (valfx.match(re[i])) {
						fres = true;
						break;
					}
				}
				if (parhst[ppt].selopt == "==" && fres == false) continue;
				if (parhst[ppt].selopt == "<>" && fres == true ) continue; 
			}
		}

		var vals = "";

		if (parhst[ppt].vstack !== "") vals = data[x][parhst[ppt].vstack];
		if (isNaN(vals)) vals = vals.toLowerCase();

		vdat[ind] = {
			s: vals, // stack value
			x: valx, // X-Values
			c: 0, // Counter for averages
			y1: 0, // 1st y value
			y2: 0, // 2nd y value
			y3: 0, // 3rd y value
			y4: 0, // 4th y value
			z: 0   // z value
		};

		// if ADD then add y values, ofr IND, STK keep them separated
		if (parhst[ppt].stsel == 'ADD') {
			if (parhst[ppt].sely1 !== "" && data[x][y1] != "" && !isNaN(data[x][y1])) {
				vdat[ind].y1 += parseFloat(data[x][y1]);
			}
			if (parhst[ppt].sely2 !== "" && data[x][y2] != "" && !isNaN(data[x][y2])) {
				vdat[ind].y1 += parseFloat(data[x][y2]);
			}
			if (parhst[ppt].sely3 !== "" && data[x][y3] != "" && !isNaN(data[x][y3])) {
				vdat[ind].y1 += parseFloat(data[x][y3]);
			}
			if (parhst[ppt].sely4 !== "" && data[x][y4] != "" && !isNaN(data[x][y4])) {
				vdat[ind].y1 += parseFloat(data[x][y4]);
			}
		} else if (parhst[ppt].stsel == 'IND' || parhst[ppt].stsel == 'STK') {
			if (parhst[ppt].sely1 !== "" && data[x][y1] != "" && !isNaN(data[x][y1])) {
				vdat[ind].y1 = parseFloat(data[x][y1]);
			}
			if (parhst[ppt].sely2 !== "" && data[x][y2] != "" && !isNaN(data[x][y2])) {
				vdat[ind].y2 = parseFloat(data[x][y2]);
			}
			if (parhst[ppt].sely3 !== "" && data[x][y3] != "" && !isNaN(data[x][y3])) {
				vdat[ind].y3 = parseFloat(data[x][y3]);
			}
			if (parhst[ppt].sely4 !== "" && data[x][y4] != "" && !isNaN(data[x][y4])) {
				vdat[ind].y4 = parseFloat(data[x][y4]);
			}
		}
		// Z-Axis values always summarized
		if (parhst[ppt].selz1 !== "" && data[x][z1] != "" && !isNaN(data[x][z1])) {
			vdat[ind].z += parseFloat(data[x][z1]);
		}
		if (parhst[ppt].selz2 !== "" && data[x][z2] != "" && !isNaN(data[x][z2])) {
			vdat[ind].z += parseFloat(data[x][z2]);
		}
		if (parhst[ppt].selz3 !== "" && data[x][z3] != "" && !isNaN(data[x][z3])) {
			vdat[ind].z += parseFloat(data[x][z3]);
		}
		if (parhst[ppt].selz4 !== "" && data[x][z4] != "" && !isNaN(data[x][z4])) {
			vdat[ind].z += parseFloat(data[x][z4]);
		}

		// multiply with selected field 
		if (parhst[ppt].selfc !== "") {
			if (!isNaN(data[x][fc])) {
				vdat[ind].y1 = vdat[ind].y1 * parseFloat(data[x][fc]);
				vdat[ind].y2 = vdat[ind].y2 * parseFloat(data[x][fc]);
				vdat[ind].y3 = vdat[ind].y3 * parseFloat(data[x][fc]);
				vdat[ind].y4 = vdat[ind].y4 * parseFloat(data[x][fc]);
			}
		}
		// multiply with parhst[ppt].factor
		if (parhst[ppt].fact !== "" && parhst[ppt].fact !== 0) {
			vdat[ind].y1 = vdat[ind].y1 * parseFloat(parhst[ppt].fact);
			vdat[ind].y2 = vdat[ind].y2 * parseFloat(parhst[ppt].fact);
			vdat[ind].y3 = vdat[ind].y3 * parseFloat(parhst[ppt].fact);
			vdat[ind].y4 = vdat[ind].y4 * parseFloat(parhst[ppt].fact);
		}

		ind++;
	}

	// sort VDAT by x values (numeric or text)
	vdat.sort(function(a, b) {
		var t1 = a.x + '' + a.s,
			t2 = b.x + '' + b.s;
		return t1 < t2 ? -1 : t1 > t2 ? 1 : 0;
	});

}


function CalcMaxMinAvg() {
	// Prepare Max/Min Values for Axis Scaling

	// Calculate Maximum Y-Axis
	var maximum = vdat[0].y1;
	var yval = [];
	var n = 0;
	for (n = 0; n < vdat.length; n++) {
		yval = vdat[n].y1;
		if (parhst[ppt].stsel == 'STK') {
			if (parhst[ppt].sely2 !== "") yval += vdat[n].y2;
			if (parhst[ppt].sely3 !== "") yval += vdat[n].y3;
			if (yval > maximum) {
				maximum = yval;
			}
		} else if (parhst[ppt].stsel == 'IND') {
			if (parhst[ppt].sely1 !== "") {
				if (vdat[n].y1 > maximum) maximum = vdat[n].y1;
			}
			if (parhst[ppt].sely2 !== "") {
				if (vdat[n].y2 > maximum) maximum = vdat[n].y2;
			}
			if (parhst[ppt].sely3 !== "") {
				if (vdat[n].y3 > maximum) maximum = vdat[n].y3;
			}
			if (parhst[ppt].sely4 !== "") {
				if (vdat[n].y4 > maximum) maximum = vdat[n].y4;
			}
		} else {
			if (yval > maximum) {
				maximum = yval;
			}
		}
	}

	// Calculate Minimum Y-Axis
	var minimum = vdat[0].y1;
	for (n = 0; n < vdat.length; n++) {
		yval = vdat[n].y1;
		if (parhst[ppt].stsel == 'STK' || parhst[ppt].stsel == 'IND') {
			if (parhst[ppt].sely2 !== "") {
				if (vdat[n].y2 < minimum) {
					minimum = vdat[n].y2;
				}
			}
			if (parhst[ppt].sely3 !== "") {
				if (vdat[n].y3 < minimum) {
					minimum = vdat[n].y3;
				}
			}
			if (parhst[ppt].sely4 !== "") {
				if (vdat[n].y4 < minimum) {
					minimum = vdat[n].y4;
				}
			}
		}
		if (vdat[n].y1 < minimum) {
			minimum = vdat[n].y1;
		}
	}

	// minimum/maximum X-axis
	xmin = vdat[0].x;
	xmax = vdat[vdat.length - 1].x;

	// default max/min values for histogram
	for (n = 0; n < vdat.length; n++) {
		if (n == 0) {
			hstmax = hstmin = vdat[n].x;
		}
		if (vdat[n].x > hstmax) hstmax = vdat[n].x;
		if (vdat[n].x < hstmin) hstmin = vdat[n].x;
	}
	if (parhst[ppt].hstinpmax == "") parhst[ppt].hstinpmax = hstmax;
	else hstmax = parhst[ppt].hstinpmax;
	if (parhst[ppt].hstinpmin == "") parhst[ppt].hstinpmin = hstmin;
	else hstmin = parhst[ppt].hstinpmin;
	document.getElementById("IDHSTMAX").value = parhst[ppt].hstinpmax;
	document.getElementById("IDHSTMIN").value = parhst[ppt].hstinpmin;

	// Calculate Average
	var cnthst = 0;
	average = 0;
	for (n = 0; n < vdat.length; n++) {
		if (vdat[n].x >= hstmin && vdat[n].x <= hstmax) {
			if (parhst[ppt].stsel == 'ADD') {
				average += vdat[n].y1;
			} else {
				average += vdat[n].y1;
				if (parhst[ppt].sely2 !== "") average += vdat[n].y2;
				if (parhst[ppt].sely3 !== "") average += vdat[n].y3;
				if (parhst[ppt].sely4 !== "") average += vdat[n].y4;
			}
			cnthst += 1;
		}
	}
	average = average / cnthst;
	
	// Average Z-Value
	var avgzval = 0;
	var cntzhst = 0;
	for (n = 0; n < vdat.length; n++) {
	  avgzval += vdat[n].z;
	  cntzhst += 1;
	}
	avgzval = avgzval / cntzhst;
	
	var zstddev = 0;
	var zallpos = true;
	var zallneg = true;
	for (n = 0; n < vdat.length; n++) {
	  zstddev += Math.abs(vdat[n].z - avgzval) ;
	  if (vdat[n].z < 0) zallpos = false;
	  if (vdat[n].z > 0) zallneg = false;
	}
	zstddev = zstddev / cnthst;
	zstddev = parseFloat(zstddev.toPrecision(3));
	
	var zmaxval = avgzval + zstddev * 4;
	if (zallneg && zmaxval > 0) maximum = 0;
	var zminval = avgzval - zstddev * 4;
	if (zallpos && zminval < 0) minimum = 0;
	
	if (zmaxval == zminval) {
		zmaxval += 1;
		zmax = zmaxval;
		zminval -= 1;
		zmin = zminval;
	}

	var flen = Math.pow(10, Math.trunc(Math.log10(Math.abs(average))));
	average = parseFloat(average.toPrecision(5));

	// Calculate standard deviation
	var stddev = 0;
	var allpos = true;
	var allneg = true;
	for (n = 0; n < vdat.length; n++) {
		if (vdat[n].x >= hstmin && vdat[n].x <= hstmax) {
			var sval = vdat[n].y1;
			if (parhst[ppt].stsel == 'ADD') {
				stddev += Math.abs(sval - average);
			} else {
				if (parhst[ppt].sely2 !== "") sval += vdat[n].y2;
				if (parhst[ppt].sely3 !== "") sval += vdat[n].y3;
				if (parhst[ppt].sely4 !== "") sval += vdat[n].y4;
				stddev += Math.abs(sval - average);
			}
			if (sval < 0) allpos = false;
			if (sval > 0) allneg = false;
		}
	}
	stddev = stddev / cnthst;
	stddev = parseFloat(stddev.toPrecision(3));

	// calculate max/min values for y-axis
	if (parhst[ppt].stsel == 'ADD') {
		var xrel = (maximum - minimum) / stddev;
		if (xrel > 10) {
			minimum = average - stddev * 4;
			if (allpos && minimum < 0) minimum = 0;
			maximum = average + stddev * 4;
			if (allneg && maximum > 0) maximum = 0;
		}
	}

	if (maximum == minimum) {
		maximum += 1;
		ymax = maximum;
		minimum -= 1;
		ymin = minimum;
	}

	if (parhst[ppt].xinpmax == "") parhst[ppt].xinpmax = xmax;
	else xmax = parhst[ppt].xinpmax;
	if (parhst[ppt].xinpmin == "") parhst[ppt].xinpmin = xmin;
	else xmin = parhst[ppt].xinpmin;
	document.getElementById("IDXMAX").value = parhst[ppt].xinpmax;
	document.getElementById("IDXMIN").value = parhst[ppt].xinpmin;

	var dy = Math.abs(maximum - minimum);
	var da = Math.abs(average - minimum);
	var ds = Math.trunc((dy / da) / 5);
	if (ds == 0 || dy < 1 || da < 1) ds = 1;

	if (parhst[ppt].ytmax != "") ymax = parseFloat(parhst[ppt].ytmax);
	if (parhst[ppt].ytmin != "") ymin = parseFloat(parhst[ppt].ytmin);
	if (parhst[ppt].ytmax == "" || ymax == 0 || isNaN(ymax) || parhst[ppt].ytmin == "" || isNaN(ymin)) {
		ymax = maximum / ds;
		ymin = minimum / ds;
		flen = Math.pow(10, Math.trunc(Math.log10(Math.abs(ymax - ymin))));
		if (flen == 0) flen = 1;
		ymax = ymax / flen;
		ymax = Math.ceil(ymax);
		ymax = ymax * flen;
		ymin = ymin / flen;
		ymin = Math.floor(ymin);
		ymin = ymin * flen;
		if (parhst[ppt].vstack !== "" && parhst[ppt].stsel == 'STK') {
			ymax = ymax * 2 * Math.sqrt(sdat.length);
			flen = Math.pow(10, Math.trunc(Math.log10(Math.abs(ymax - ymin))));
			if (flen == 0) flen = 1;
			ymax = ymax / flen;
			ymax = Math.ceil(ymax);
			ymax = ymax * flen;
		}
		document.getElementById("IDYTMAX").value = ymax;
		document.getElementById("IDYTMIN").value = ymin;
	}
	
	
	var dz = Math.abs(zmaxval - zminval);
	da = Math.abs(avgzval - zminval);
	ds = Math.trunc((dz / da) / 5);
	if (ds == 0 || dz < 1 || da < 1) ds = 1;
	if (parhst[ppt].ztmax != "") zmax = parseFloat(parhst[ppt].ztmax);
	if (parhst[ppt].ztmin != "") zmin = parseFloat(parhst[ppt].ztmin);
	if (parhst[ppt].ztmax == "" || zmax == 0 || isNaN(zmax) || parhst[ppt].ztmin == "" || isNaN(zmin)) {
		zmax = zmaxval / ds;
		zmin = zminval / ds;
		flen = Math.pow(10, Math.trunc(Math.log10(Math.abs(zmax - zmin))));
		if (flen == 0) flen = 1;
		zmax = zmax / flen;
		zmax = Math.ceil(zmax);
		zmax = zmax * flen;
		zmin = zmin / flen;
		zmin = Math.floor(zmin);
		zmin = zmin * flen;
		
  	if (zallneg && zmax > 0) zmax = 0;
	  if (zallpos && zmin < 0) zmin = 0;
	  
		if (parhst[ppt].vstack !== "" && parhst[ppt].stsel == 'STK') {
			zmax = zmax * 2 * Math.sqrt(sdat.length);
			flen = Math.pow(10, Math.trunc(Math.log10(Math.abs(zmax - zmin))));
			if (flen == 0) flen = 1;
			zmax = zmax / flen;
			zmax = Math.ceil(zmax);
			zmax = zmax * flen;
		}

    if (parhst[ppt].sndyaxis) {
		  document.getElementById("IDZTMAX").value = zmax;
		  document.getElementById("IDZTMIN").value = zmin;
		}
	}

	document.getElementById('IDdetail').innerHTML = "<small> Avg: " + average.toPrecision(5) + "  Std.Dev: " + stddev.toPrecision(3) + "</small>";

}

function CalcHistogram() {
	var hstx = 0;
	var cntot = 0;
	var n = 0;
	var i = 0;
	var flen = 0;
	var ts = 0;
	var te = 0;

	for (n = 0; n < 101; n++) {
		hstx = n / 100 * (parseFloat(ymax) - parseFloat(ymin));

		flen = Math.pow(10, Math.trunc(Math.log10(Math.abs(hstx))));
		if (flen == 0) flen = 1;
		if (flen < 1) {
			var fct = Math.trunc(1 / flen);
			hstx = hstx / flen;
			hstx = parseFloat(hstx.toPrecision(5)) / fct;
		} else {
			hstx = hstx / flen;
			hstx = parseFloat(hstx.toPrecision(5)) * flen;
		}

		cntmin[n] = parseFloat(ymin) + parseFloat(hstx);
		cntlbl[n] = "" + cntmin[n] + " ms";
		cntval[n] = 0;
	}
	for (n = 0; n < 101; n++) {
		cntmax[n] = cntmin[n + 1];
		if (n == 100) cntmax[n] = 100;
	}
	// fill histogram bins
	for (n = 0; n < vdat.length; n++) {
		if (vdat[n].x >= hstmin && vdat[n].x < hstmax) {
			for (i = 0; i < 101; i++) {
				var sumy = vdat[n].y1 + vdat[n].y2 + vdat[n].y3 + vdat[n].y4;
				if (sumy >= cntmin[i] && sumy < cntmax[i]) {
					cntval[i] += 1;
					cntot += 1;
					break;
				}
			}
		}
	}
	var cum = 0;
	for (n = 0; n < 101; n++) {
		cum += cntval[n] / cntot * 100;
		cntcum[n] = cum;
	}

	// Peak Position
	var max = 0;
	var pos = 0;
	var peak = 0;

	for (n = 0; n < 100; n++) {
		if (parseInt(cntval[n]) > max) {
			max = parseInt(cntval[n]);
			peak = cntmin[n];
			pval = parseInt(cntval[n]);
			pos = n;
		}
	}
	pval = pval * 1.2;

	// Peak Width (sigma) 
	var total = 0;
	for (n = 0; n < 101; n++) {
		total += cntval[n];
	}
	total = Math.trunc(total * 0.682689);
	var subtot = cntval[pos];
	var sind = pos;
	var eind = pos;
	while (subtot <= total) {
		ts = sind;
		te = eind;
		if (sind > 0) {
			ts = sind - 1;
		}
		if (eind < 99) {
			te = eind + 1;
		}
		if (cntval[ts] > cntval[te] || eind == 99) {
			subtot += cntval[ts];
			sind = ts;
		}
		if (cntval[ts] <= cntval[te] || sind == 0) {
			subtot += cntval[te];
			eind = te;
		}
		if (sind == 0 && eind == 99) break;
	}
	FWHM = cntmin[eind] - cntmin[sind];
	FWHM = parseFloat(FWHM.toPrecision(5));

	// Peak Width ( 2 sigma)
	total = 0;
	for (n = 0; n < 101; n++) {
		total += cntval[n];
	}
	total = Math.trunc(total * 0.9545);
	subtot = cntval[pos];
	sind = pos;
	eind = pos;
	while (subtot <= total) {
		ts = sind;
		te = eind;
		if (sind > 0) {
			ts = sind - 1;
		}
		if (eind < 99) {
			te = eind + 1;
		}
		if (cntval[ts] > cntval[te] || eind == 99) {
			subtot += cntval[ts];
			sind = ts;
		}
		if (cntval[ts] <= cntval[te] || sind == 0) {
			subtot += cntval[te];
			eind = te;
		}
		if (sind == 0 && eind == 99) break;
	}
	var FWHM2 = cntmin[eind] - cntmin[sind];
	FWHM2 = parseFloat(FWHM2.toPrecision(5));

	for (n = 0; n < 101; n++) {
		cntval[n] = "" + cntval[n].toFixed(0);
	}

	if (parhst[ppt].stsel == 'ADD') {
		document.getElementById('IDdetail').innerHTML += "<small>  -  Peak: " + peak.toPrecision(5) + "  &sigma;: " + FWHM.toPrecision(5) + " (from: " + cntmin[sind].toPrecision(3) + " to " + cntmin[eind].toPrecision(3) + ")  2&sigma;: " + FWHM2.toPrecision(5) + "</small>";
	}
}

function CalcAverage() {
	// Average n Points
	if (parhst[ppt].avgint > 1) {
		var avg = 0;
		var adat = [];
		var n = 0;
		var ind = 0;

		for (n = 0; n < vdat.length; n++) {

			if (avg == 0) {
				adat[ind] = vdat[n];
				adat[ind].c = 1;
				avg = 1;
			} else {
				if (adat[ind].s == vdat[n].s) {
					adat[ind].y1 += vdat[n].y1;
					adat[ind].y2 += vdat[n].y2;
					adat[ind].y3 += vdat[n].y3;
					adat[ind].y4 += vdat[n].y4;
					adat[ind].z  += vdat[n].z;
					adat[ind].c += 1;
					avg += 1;
				} else {
					// stack changed > calculate average and add new entry
					adat[ind].y1 = adat[ind].y1 / adat[ind].c;
					adat[ind].y2 = adat[ind].y2 / adat[ind].c;
					adat[ind].y3 = adat[ind].y3 / adat[ind].c;
					adat[ind].y4 = adat[ind].y4 / adat[ind].c;
					adat[ind].z  = adat[ind].z  / adat[ind].c;
					ind += 1;
					adat[ind] = vdat[n];
					adat[ind].c = 1;
					avg = 1;
				}
			}

			if (avg == parhst[ppt].avgint) {
				adat[ind].y1 = adat[ind].y1 / adat[ind].c;
				adat[ind].y2 = adat[ind].y2 / adat[ind].c;
				adat[ind].y3 = adat[ind].y3 / adat[ind].c;
				adat[ind].y4 = adat[ind].y4 / adat[ind].c;
				adat[ind].z  = adat[ind].z  / adat[ind].c;
				adat[ind].c = 0;
				ind += 1;
				avg = 0;
			}
		}
		// calculate average for last non processed record
		try {
			if (adat[ind].c > 0) {
				adat[ind].y1 = adat[ind].y1 / adat[ind].c;
				adat[ind].y2 = adat[ind].y2 / adat[ind].c;
				adat[ind].y3 = adat[ind].y3 / adat[ind].c;
				adat[ind].y4 = adat[ind].y4 / adat[ind].c;
				adat[ind].z  = adat[ind].z  / adat[ind].c;
				adat[ind].c = 0;
			}
		} catch (err) {}

		vdat = adat;
		adat = null;
	}

}


function ClipValues() {
	// limit y values (remove values where y < min or y > max)
	var n = 0;
	if ((vmin != "") || (vmax != "")) {
		for (n = 0; n < vdat.length; n++) {
			if (((vmin != "") && (vdat[n].y1 <= vmin)) || ((vmax != "") && (vdat[n].y1 >= vmax))) {
				// if (x > 1) vdat[n].y1 = vdat[n-1].y1;
				vdat.splice(n, 1);
				n = n - 1;
			}
		}
	}
}

function showhistogram() {
	// Show Histogram

	var x = 0;

	if (parhst[ppt].showhist) {
		var layout = {
			autosize: false,
			width: parhst[ppt].Hw,
			height: window.innerHeight * sheight,
			paper_bgcolor: parhst[ppt].chcolor,
			plot_bgcolor: parhst[ppt].chcolor,
			margin: {
				b: 150,
				t: 120,
				l: 75,
				r: 75
			},
			yaxis: {
				range: [ymin, ymax],
				dtick: (ymax - ymin) / 20,
				showgrid: true,
				title: '',
				type: '',
				tickfont: {
					size: parhst[ppt].tfonts
				},
				autorange: false,
				gridcolor: parhst[ppt].grcolor
			},
			xaxis: {
				range: [0, 105],
				dtick: 10,
				domain: [0, 1],
				showgrid: true,
				tickfont: {
					size: parhst[ppt].tfonts
				},
				title: '',
				gridcolor: parhst[ppt].grcolor,
				margin: {
					b: 120,
				},
			},
			xaxis2: {
				domain: [0, 1],
				range: [0, pval],
				overlaying: 'x',
				showgrid: false,
				tickfont: {
					size: parhst[ppt].tfonts
				},
				title: '',
				side: 'top'
			},
			title: {
				text: '<b>Histogram - Avg.: ' + average.toPrecision(3) + " (&#963;=" + FWHM.toPrecision(2) + ")",
				font: {
					size: parhst[ppt].cfonts
				},
			},
			font: {
				color: parhst[ppt].fgcolor
			},
			legend: {
				x: hlegposx,
				y: hlegposy,
				font: {
					family: 'courier',
					size: parhst[ppt].tfonts,
					color: parhst[ppt].fgcolor
				},
			},
			// barmode: 'stack'
		};

		var trace1 = {
			type: 'scatter',
			mode: 'lines',
			x: [],
			y: [],
			xaxis: 'x1',
			yaxis: 'y1',
			name: '% cumulated',
			orientation: 'h',
			line: {
				size: 0.1,
				color: 'lightgray'
			}
		};
		var trace2 = {
			type: 'bar',
			x: [],
			y: [],
			xaxis: 'x2',
			yaxis: 'y1',
			name: '< ' + parhst[ppt].colsc[0][0] + '',
			orientation: 'h',
			overlaying: 'x',
			marker: {
				color: parhst[ppt].colsc[0][1],
				width: 5
			},
		};
		var trace3 = {
			type: 'bar',
			x: [],
			y: [],
			xaxis: 'x2',
			yaxis: 'y1',
			name: '< ' + parhst[ppt].colsc[1][0] + '',
			orientation: 'h',
			overlaying: 'x',
			marker: {
				color: parhst[ppt].colsc[1][1],
				width: 5
			},
		};
		var trace4 = {
			type: 'bar',
			x: [],
			y: [],
			xaxis: 'x2',
			yaxis: 'y1',
			name: '< ' + parhst[ppt].colsc[2][0] + '',
			orientation: 'h',
			overlaying: 'x',
			marker: {
				color: parhst[ppt].colsc[2][1],
				width: 5
			},
		};
		var trace5 = {
			type: 'bar',
			x: [],
			y: [],
			xaxis: 'x2',
			yaxis: 'y1',
			name: '> ' + parhst[ppt].colsc[3][0] + '',
			orientation: 'h',
			overlaying: 'x',
			marker: {
				color: parhst[ppt].colsc[3][1],
				width: 5
			},
		};

		var t2 = 0;
		var t3 = 0;
		var t4 = 0;
		var t5 = 0;
		var tt = 0;

		for (x = 0; x < cntmin.length; x++) {
			if (cntmin[x] < parhst[ppt].colsc[0][0]) {
				trace2.x[x] = cntval[x];
				trace2.y[x] = cntmin[x];
				t2 += parseFloat(cntval[x]);
			} else if (cntmin[x] >= parhst[ppt].colsc[0][0] && cntmin[x] < parhst[ppt].colsc[1][0]) {
				trace3.x[x] = cntval[x];
				trace3.y[x] = cntmin[x];
				t3 += parseFloat(cntval[x]);
			} else if (cntmin[x] >= parhst[ppt].colsc[1][0] && cntmin[x] < parhst[ppt].colsc[2][0]) {
				trace4.x[x] = cntval[x];
				trace4.y[x] = cntmin[x];
				t4 += parseFloat(cntval[x]);
			} else {
				trace5.x[x] = cntval[x];
				trace5.y[x] = cntmin[x];
				t5 += parseFloat(cntval[x]);
			}
			if (x < 100) {
				tt += parseFloat(cntval[x]);
				trace1.x[x] = "" + cntcum[x].toFixed(2);
				trace1.y[x] = cntmin[x];
			}
		}

		t2 = t2 / tt * 100;
		var tt2 = "" + t2.toFixed(0);
		t3 = t3 / tt * 100;
		var tt3 = "" + t3.toFixed(0);
		t4 = t4 / tt * 100;
		var tt4 = "" + t4.toFixed(0);
		t5 = t5 / tt * 100;
		var tt5 = "" + t5.toFixed(0);
		trace2.name = '< ' + parhst[ppt].colsc[0][0] + ' - ' + tt2 + ' %';
		trace3.name = '< ' + parhst[ppt].colsc[1][0] + ' - ' + tt3 + ' %';
		trace4.name = '< ' + parhst[ppt].colsc[2][0] + ' - ' + tt4 + ' %';
		trace5.name = '> ' + parhst[ppt].colsc[2][0] + ' - ' + tt5 + ' %';

		cntval = [];
		cntmin = [];

		var data = [trace1, trace2, trace3, trace4, trace5];

		if (parhst[ppt].logdis) {
			layout.yaxis.type = "log";
			layout.yaxis.dtick = "";
			layout.yaxis.range = [Math.log10(ymin), Math.log10(ymax)];
		}

		try {
			Plotly.newPlot('IDhst', data, layout, {
				showLink: false,
				showSendToCloud: false,
				responsive: true,
				editable: true
			});
		} catch (err) {}

		var myHist = document.getElementById('IDhst');

		myHist.on('plotly_click', function(data) {

		});

		myHist.on('plotly_relayout', function(eventdata) {
			scaleaxishist(eventdata);
		});

	}
}

function graphic() {
	// Graphic output

	// see also http://anhr.github.io/resizer/ and https://stackoverflow.com/questions/8960193/how-to-make-html-element-resizable-using-pure-javascript

	document.body.style.cursor = "none";
	document.title = 'Data Analysis - calculating graphic ... ';
	document.getElementById("IDDOT").className = "dotred";
	document.getElementById("IDDOT").hidden = true;
	document.getElementById("IDDOT").hidden = false;

	// Histogram On/Off
	if (parhst[ppt].showhist) {
		document.getElementById('IDhstbox').style.display = "inline-block";
		document.getElementById('IDL').style.display = "inline-block";
		document.getElementById('IDCbox').style.display = "flex";
		document.getElementById('IDR').style.display = "inline-block";
		document.getElementById('IDBHST').textContent = "Hide Histogram";

		if (parhst[ppt].Hw == 0) {
			parhst[ppt].Hw = Math.trunc((document.body.clientWidth - 40) * (0.33));
		}
		parhst[ppt].Gw = Math.trunc((document.body.clientWidth - 40 - parhst[ppt].Hw));

	} else {
		document.getElementById('IDhstbox').style.display = "none";
		document.getElementById('IDL').style.display = "none";
		document.getElementById('IDCbox').style.display = "none";
		document.getElementById('IDR').style.display = "none";
		document.getElementById('IDBHST').textContent = "Show Histogram";

		parhst[ppt].Gw = Math.trunc((document.body.clientWidth - 40) * 0.95);
	}
	
	if (parhst[ppt].opaci == 0 || parhst[ppt].opaci == '' || parhst[ppt].opaci == undefined ) parhst[ppt].opaci = 0.75;
	if (parhst[ppt].zopac == 0 || parhst[ppt].zopac == '' || parhst[ppt].zopac == undefined ) parhst[ppt].zopac = 0.50;

	if (parhst[ppt].Gw == 0) {
		if (parhst[ppt].Hw > 0) {
			parhst[ppt].Gw = Math.trunc((document.body.clientWidth - 40 - parhst[ppt].Hw));
		} else {
			parhst[ppt].Gw = Math.trunc((document.body.clientWidth - 40) * gwidth);
			parhst[ppt].Hw = Math.trunc((document.body.clientWidth - 40) * (1 - gwidth));
		}
	}

	var hstbox = document.getElementById('IDhstbox');
	var grpbox = document.getElementById('IDgrpbox');
	hstbox.style.minWidth = parhst[ppt].Hw + 'px';
	grpbox.style.minWidth = parhst[ppt].Gw + 'px';

	// refresh graphic (async) to allow screen refresh (parameters, status light = red) first
	// delay is 50 ms
	setTimeout(function() {

		var x = 0;
		var n = 0;
		var i = 0;

		var tp = 0;
		var rel = 0;
		var slayout;

		parhst[ppt].ustat = true;

		if (start) {
			start = false;
		} else {
			p0 = perfnow();
		}

		// prepare data
		vdat = [];

		var x1 = parseInt(parhst[ppt].selx1);
		var x2 = parseInt(parhst[ppt].selx2);
		var x3 = parseInt(parhst[ppt].selx3);
		var x4 = parseInt(parhst[ppt].selx4);

		var y1 = parseInt(parhst[ppt].sely1);
		var y2 = parseInt(parhst[ppt].sely2);
		var y3 = parseInt(parhst[ppt].sely3);
		var y4 = parseInt(parhst[ppt].sely4);
		
		var z1 = parseInt(parhst[ppt].selz1);
		var z2 = parseInt(parhst[ppt].selz2);
		var z3 = parseInt(parhst[ppt].selz3);
		var z4 = parseInt(parhst[ppt].selz4);

		if (isNaN(x1) && isNaN(x2) && isNaN(x3) && isNaN(x4)) {
			alert('Specify field(s) for X-Axis');
			return;
		}
		if (isNaN(y1) && isNaN(y2) && isNaN(y3) && isNaN(y4)) {
			alert('Specify field(s) for Y-Axis');
			return;
		}

		// Load selected data into VDAT table and sort
		LoadData(); 

		// Clip Y-Values
		ClipValues();

		// Agregate Points for same x-value
		AgregateData(); 

		//  remove data point which are not equally present in all stacks
		CleanData();

		// build stack group
		BuildStackGroup();

		// Agregate Points for same x-value
		// AgregateData();

		// default line chart and optimal average value
		PrepareDefaults();

		// Prepare Max/Min Values for Axis Scaling
		CalcMaxMinAvg(); 

		// Calculate Histogram
		CalcHistogram();

		// Average n Points 
		CalcAverage();

		document.getElementById("IDgraphic").style.display = "inline-block";

		// parhst[ppt].showhistogram
		showhistogram();

		var ind = 0;

		// chart type settings
		if (parhst[ppt].grtype == 'scatter') {
			chtype = 'scatter';
			chmode = 'markers';
		} else if (parhst[ppt].grtype == 'line') {
			chtype = 'scatter';
			chmode = 'lines';
		} else if (parhst[ppt].grtype == 'bar') {
			chtype = 'bar';
			chmode = '';
		} else if (parhst[ppt].grtype == 'area') {
			chtype = 'scatter';
			chmode = 'lines';
		} else if (parhst[ppt].grtype == 'stack') {
			chtype = 'scatter';
			chmode = 'lines';
		}
		
		// chart type settings
		if (parhst[ppt].grztype == 'scatter') {
			zhtype = 'scatter';
			zhmode = 'markers';
			filmoz = 'none';
		} else if (parhst[ppt].grztype == 'line') {
			zhtype = 'scatter';
			zhmode = 'lines';
			filmoz = 'none';
		} else if (parhst[ppt].grztype == 'bar') {
			zhtype = 'bar';
			zhmode = '';
			filmoz = 'none';
		} else if (parhst[ppt].grztype == 'area') {
			zhtype = 'scatter';
			zhmode = 'lines';
			filmoz = 'tozeroy'
		}	
		
		
		
		if (parhst[ppt].stsel == 'ADD') {
			slegend = false;
			stmode = 'group';
			sgroup0 = "";
			sgroup1 = "";
			sgroup2 = "";
			sgroup3 = "";
			lnsize = parhst[ppt].dtsize;
		} else if (parhst[ppt].stsel == 'IND') {
			slegend = true;
			stmode = 'group';
			sgroup0 = "";
			sgroup1 = "";
			sgroup2 = "";
			sgroup3 = "";
			lnsize = parhst[ppt].dtsize;
		} else if (parhst[ppt].stsel == 'STK') {
			slegend = true;
			stmode = 'stack';
			chmode = 'lines';
			lnsize = parhst[ppt].dtsize;
			if (parhst[ppt].sely1 != "") sgroup0 = "A";
			else sgroup0 = "";
			if (parhst[ppt].sely2 != "") sgroup1 = "A";
			else sgroup1 = "";
			if (parhst[ppt].sely3 != "") sgroup2 = "A";
			else sgroup2 = "";
			if (parhst[ppt].sely4 != "") sgroup3 = "A";
			else sgroup3 = "";
		}

		function setstack(color, group, xaxis, yaxis) {
	/* jshint validthis: true */
			this.x = [];
			this.y = [];
			this.xaxis = xaxis;
			this.yaxis = yaxis;
			this.mode = chmode;
			this.type = chtype;
			this.stackgroup = group;
			this.showlegend = slegend;
			this.fillcolor = hexToRgbA(color,parhst[ppt].opaci);
			// this.overlaying = 'x';
			this.marker = {
				size: parhst[ppt].dtsize,
				color: hexToRgbA(color,parhst[ppt].opaci),
			};
			this.fill = filmod;
				this.line = {
					color: hexToRgbA(color,parhst[ppt].opaci),
					width: lnsize,
					shape: parhst[ppt].sshape,
				};
		}

		// prepare chart plot
		var stack1 = new setstack(parhst[ppt].ptcolor, sgroup0, 'x1', 'y1');
		var stack2 = new setstack(parhst[ppt].p1color, sgroup1, 'x1', 'y1');
		var stack3 = new setstack(parhst[ppt].p2color, sgroup2, 'x1', 'y1');
		var stack4 = new setstack(parhst[ppt].p3color, sgroup3, 'x1', 'y1');
		// var zstack = new setstack(parhst[ppt].pzcolor, 'Z', 'x1', 'y2');
		
		var zstack = {
			x: [],
			y: [],
			xaxis: 'x1',
			yaxis: 'y2',
			mode: zhmode,
			type: zhtype,
			showlegend: true,
			// overlaying: 'y',
			fill: filmoz,
			name: '',
			//zopac: parhst[ppt].zopac,
			fillcolor: hexToRgbA(parhst[ppt].pzcolor,parhst[ppt].zopac),
			marker: {
				size: parhst[ppt].ztsize,
				color: hexToRgbA(parhst[ppt].pzcolor,parhst[ppt].zopac),
			},
			line: {
				width: parhst[ppt].ztsize,
				// color: parhst[ppt].pzcolor,
				color: hexToRgbA(parhst[ppt].pzcolor,parhst[ppt].zopac),
				shape: parhst[ppt].zshape,
			}
		};
		
		try {
			if (parhst[ppt].selz1 != "") zstack.name = header[z1][0];
			if (parhst[ppt].selz2 != "") zstack.name = zstack.name + " + " + header[z2][0];
			if (parhst[ppt].selz3 != "") zstack.name = zstack.name + " + " + header[z3][0];
			if (parhst[ppt].selz4 != "") zstack.name = zstack.name + " + " + header[z4][0];
	  } catch (err) {}

		var strace1 = {
			x: [],
			y: [],
			mode: 'lines',
			type: 'scatter',
			showlegend: false,
			overlaying: 'x',
			line: {
				width: 2,
				color: 'Orange',
				dash: 'solid'
			}
		};
		var strace2 = {
			x: [],
			y: [],
			mode: 'lines',
			type: 'scatter',
			showlegend: false,
			overlaying: 'x',
			line: {
				width: 2,
				color: 'DarkOrange',
				dash: lntype,
			}
		};
		var strace3 = {
			x: [],
			y: [],
			mode: 'lines',
			type: 'scatter',
			showlegend: true,
			overlaying: 'x',
			name: 'Average',
			line: {
				color: 'gray',
				width: 1
			}
		};


		var sdata = [];

		// xmin = xmax = "";
		if (xmin == "" && xmax == "") {
			xmin = vdat[0].x;
			xmax = vdat[(vdat.length - 1)].x;
			xlen = vdat[0].x.length;
		}

		strace1.x[0] = "";
		strace2.x[0] = "";

		if (xmin == "" && xmax == "") {
			xmin = vdat[0].x;
			xmax = vdat[(vdat.length - 1)].x;
			xlen = vdat[0].x.length;
		}

		// add data points X/Y/Average/histogram border to chart arrays
		var nn = 0;
		upt = vdat.length * parhst[ppt].avgint;
		if (parhst[ppt].vstack !== "") {

			// calculate optimal tick distance
			x1 = parseInt(parhst[ppt].selx1);
			x2 = parseInt(parhst[ppt].selx2);
			x3 = parseInt(parhst[ppt].selx3);
			x4 = parseInt(parhst[ppt].selx4);
			if (parhst[ppt].vstack == x1 || parhst[ppt].vstack == x2 || parhst[ppt].vstack == x3 || parhst[ppt].vstack == x4) {
				var dtick = 1;
				try {
					dtick = vdat.length / sdat.length;
				} catch (err) {}
				if (parhst[ppt].xdtick == "") parhst[ppt].xdtick = dtick;
			}

			// Stacked graphic ( Line / Bar / Area) ++++++++++++++++++++++++++++++++++++++++++++
			slayout = {
				paper_bgcolor: parhst[ppt].chcolor,
				plot_bgcolor: parhst[ppt].chcolor,
				autosize: false,
				width: parhst[ppt].Gw,
				height: window.innerHeight * sheight,
				barmode: stmode,
				margin: {
					b: 150,
					t: 120,
					l: 75,
					r: 50
				},
				yaxis: {
					range: [ymin, ymax],
					dtick: (ymax - ymin) / 20,
					title: {
						text: "",
						font: {
							size: parhst[ppt].afonts
						},
					},
					type: "",
					tickfont: {
						size: parhst[ppt].tfonts
					},
					autorange: false,
					gridcolor: parhst[ppt].grcolor
				},
				yaxis2: {
				  range: [zmin, zmax],
					title: '',
					overlaying: 'y',
					showgrid: false,
					tickfont: {
						size: parhst[ppt].tfonts
					},
					type: "",
					// autorange: true,
					side: 'right'
				},
				xaxis: {
					range: [xmin, xmax],
					gridcolor: parhst[ppt].grcolor,
					tickfont: {
						size: parhst[ppt].tfonts
					},
					dtick: parhst[ppt].xdtick,
					tickangle: 45,
					domain: [0, 1],
					title: {
						text: "",
						font: {
							size: parhst[ppt].afonts
						},
					},
					type: '-'
					// automargin: true,
				},
				font: {
					color: parhst[ppt].fgcolor
				},
				title: {
					text: '<b>',
					font: {
						size: parhst[ppt].cfonts
					},
				},
				legend: {
					x: slegposx,
					y: slegposy,
					font: {
						family: 'courier',
						color: parhst[ppt].fgcolor,
						size: parhst[ppt].tfonts
					},
				},
			};

			if (tickf !== "") slayout.xaxis.tickformat = tickf;

			sdata = [];
			var tt = 0;
			var zz = 0;
			
			zdat = [];
			

			n = 0;
			for (i = 0; i < sdat.length; i++) {
				nn = 0;

				var stackn = {
					x: [],
					y: [],
					mode: chmode,
					type: chtype,
					stackgroup: sgroup0,
					showlegend: true,
					marker: {
						size: parhst[ppt].dtsize,
						color: hexToRgbA(parhst[ppt].ptcolor,parhst[ppt].opaci),
					},
					fill: filmod,
					name: '',
					line: {
						color: hexToRgbA(parhst[ppt].ptcolor,parhst[ppt].opaci),
						width: lnsize,
						shape: parhst[ppt].sshape
					},
				};
				
				

				stackn.marker.color = stackn.line.color = stackn.fillcolor = hexToRgbA(rgbint(i, sdat.length - 1),parhst[ppt].opaci);

				var sx = [];
				var sy = [];
				var sz = [];

				rel = vdat.length / (parhst[ppt].maxpnt * sdat.length);
				if (rel < 1) rel = 1;

				ind = 0;
				n = 0;

				while (true) {
					ind = Math.trunc(n);
					if (vdat[ind].s == sdat[i].s) {
						sx[nn] = vdat[ind].x;
						sy[nn] = vdat[ind].y1 + vdat[ind].y2 + vdat[ind].y3 + vdat[ind].y4;
						
						zdat[zz] = {
							x: vdat[ind].x, // X-Values
							z: vdat[ind].z  // Z-Values
			      };
						
				    // zstack.x[zz] = vdat[ind].x;
				    // zstack.y[zz] = vdat[ind].z;
				    
						if (vdat[ind].x >= hstmin && vdat[ind].x <= hstmax) {
							strace3.x[tt] = vdat[ind].x;
							strace3.y[tt] = average;
							tt += 1;
						}
						nn++;
						zz++;
						n = n + rel;
					} else {
						n = n + 1;
					}
					if (n >= vdat.length)
						break;
				}
				stackn.x = sx;
				sx = null;
				stackn.y = sy;
				sy = null;
				stackn.name = sdat[i].s;
				stackn.stackgroup = sgroup0;
				sdata.push(stackn);
				tp += stackn.x.length;
			}
			
      // 2nd Y-Axis
      if (parhst[ppt].selz1 != "") {
      
				// sort ZDAT by x values (numeric or text)
				zdat.sort(function(a, b) {
					var t1 = a.x,
						  t2 = b.x;
					return t1 < t2 ? -1 : t1 > t2 ? 1 : 0;
				});
				
				// aggregate data
				var tdat = [];
				var z = 0;
				var t = 0;
	      for (z = 0; z < zdat.length; z++) {
	        if (z > 0 && tdat[t].x == zdat[z].x ) {
	          tdat[t].z += zdat[z].z;
	        } else {
	          if (z > 0) {
	            t += 1;
	          }
	          tdat[t]= zdat[z];
	        }
	      }
	      zdat = tdat;
	      tdat = null;
	      
	      // copy to ZSTACK
	      zz = 0;
	      for (z = 0; z < zdat.length; z++) {
	        zstack.x[zz] = zdat[z].x;
				  zstack.y[zz] = zdat[z].z;   
				  zz++; 
	      }
        
        sdata.push(zstack);
      }
      
			// average
			if (parhst[ppt].showhist) {
				sdata.push(strace3);
			}
			// histogram minimum
			if (parhst[ppt].showhist) {
				strace1.x[0] = hstmin;
				strace1.y[0] = ymin;
				strace1.x[1] = hstmin;
				strace1.y[1] = ymax;
				sdata.push(strace1);
			}
			// histogram maximum
			if (parhst[ppt].showhist) {
				strace2.x[0] = hstmax;
				strace2.y[0] = ymin;
				strace2.x[1] = hstmax;
				strace2.y[1] = ymax;
				sdata.push(strace2);
			}

			// set axis category
			if ((header[x1][1] == "d" && parhst[ppt].selx2 == "") ||
				(header[x1][1] == "t" && parhst[ppt].selx2 == "") ||
				(header[x1][1] == "d" && header[x2][1] == "n" && parhst[ppt].selx3 == "") ||
				(header[x1][1] == "t" && header[x2][1] == "n" && parhst[ppt].selx3 == "") ||
				(header[x1][1] == "d" && header[x2][1] == "t" && parhst[ppt].selx3 == "")) {
				slayout.xaxis.type = '';
			} else {
				slayout.xaxis.type = 'category';
			}

			slayout.title.text = "<b>Data: ";
			if (parhst[ppt].sely1 != "") slayout.title.text += " " + header[y1][0];
			if (parhst[ppt].sely2 != "") slayout.title.text += ", " + header[y2][0];
			if (parhst[ppt].sely3 != "") slayout.title.text += ", " + header[y3][0];
			if (parhst[ppt].sely4 != "") slayout.title.text += ", " + header[y4][0];
			slayout.title.text += " </b>(Stacked by: " + header[parhst[ppt].vstack][0] + ")";

			if (parhst[ppt].sely1 != "") stack1.name = header[y1][0];
			if (parhst[ppt].sely2 != "") stack2.name = header[y2][0];
			else {
				stack2.name = "";
				stack2.showlegend = false;
				stack1.showlegend = false;
			}
			if (parhst[ppt].sely3 != "") stack3.name = header[y3][0];
			else {
				stack3.name = "";
				stack3.showlegend = false;
			}
			if (parhst[ppt].sely4 != "") stack4.name = header[y3][0];
			else {
				stack4.name = "";
				stack4.showlegend = false;
			}

			slayout.title.text += "  -  File: " + fname;
			if (parhst[ppt].gtitle !== "") slayout.title.text = parhst[ppt].gtitle;
			if (parhst[ppt].xtitle !== "") slayout.xaxis.title.text = parhst[ppt].xtitle;
			if (parhst[ppt].ytitle !== "") slayout.yaxis.title.text = parhst[ppt].ytitle;

			if (parhst[ppt].logdis) {
				slayout.yaxis.type = "log";
				slayout.yaxis.dtick = "";
				slayout.yaxis.range = [Math.log10(ymin), Math.log10(ymax)];
			}
			if (parhst[ppt].zlogdis) {
				slayout.yaxis2.type = "log";
				slayout.yaxis2.dtick = "";
				slayout.yaxis2.range = [Math.log10(zmin), Math.log10(zmax)];
			}

			tmptl = slayout.title.text;

			// Create graphics 
			try {
				Plotly.newPlot('IDgrp', sdata, slayout, {
					showLink: false,
					showSendToCloud: false,
					editable: true,
					responsive: true
				});
			} catch (err) {}

		} else // Normal Graphic (Line / Bar / Scatter / Area) +++++++++++++++++++++++++++++++
		{
			// plot every n'th point 
			rel = vdat.length / parhst[ppt].maxpnt;
			if (rel < 1) rel = 1;

			slayout = {
				paper_bgcolor: parhst[ppt].chcolor,
				plot_bgcolor: parhst[ppt].chcolor,
				autosize: false,
				width: parhst[ppt].Gw,
				height: window.innerHeight * sheight,
				barmode: stmode,
				margin: {
					b: 150,
					t: 120,
					l: 75,
					r: 50
				},
				yaxis: {
					range: [ymin, ymax],
					dtick: (ymax - ymin) / 20,
					title: {
						text: "",
						font: {
							size: parhst[ppt].afonts
						},
					},
					tickfont: {
						size: parhst[ppt].tfonts
					},
					type: "",
					autorange: false,
					gridcolor: parhst[ppt].grcolor
				},
				yaxis2: {
				  range: [zmin, zmax],
					title: '',
					overlaying: 'y',
					showgrid: false,
					tickfont: {
						size: parhst[ppt].tfonts
					},
					type: "",
					// autorange: true,
					side: 'right'
				},
				xaxis: {
					range: [xmin, xmax],
					gridcolor: parhst[ppt].grcolor,
					tickangle: 45,
					tickfont: {
						size: parhst[ppt].tfonts
					},
					dtick: parhst[ppt].xdtick,
					title: {
						text: "",
						font: {
							size: parhst[ppt].afonts
						},
					},
					domain: [0, 1],
					// type: '-'
					// automargin: true,
				},
				font: {
					color: parhst[ppt].fgcolor
				},
				title: {
					text: '<b>Data:',
					font: {
						size: parhst[ppt].cfonts
					},
				},
				legend: {
					x: mlegposx,
					y: mlegposy,
					font: {
						family: 'courier',
						color: parhst[ppt].fgcolor,
						size: parhst[ppt].tfonts
					},
				},
			};

			if (tickf !== "") slayout.xaxis.tickformat = tickf;
			// set axis category
			if ((header[x1][1] == "d" && parhst[ppt].selx2 == "") ||
				(header[x1][1] == "t" && parhst[ppt].selx2 == "") ||
				(header[x1][1] == "d" && header[x2][1] == "n" && parhst[ppt].selx3 == "") ||
				(header[x1][1] == "t" && header[x2][1] == "n" && parhst[ppt].selx3 == "") ||
				(header[x1][1] == "d" && header[x2][1] == "t" && parhst[ppt].selx3 == "")) {
				slayout.xaxis.type = '';
			} else {
				slayout.xaxis.type = 'category';
			}

			if (parhst[ppt].sely1 != "") slayout.title.text += " " + header[y1][0];
			if (parhst[ppt].sely2 != "") slayout.title.text += " - " + header[y2][0];
			if (parhst[ppt].sely3 != "") slayout.title.text += " - " + header[y3][0];
			if (parhst[ppt].sely4 != "") slayout.title.text += " - " + header[y4][0];

			if (parhst[ppt].sely1 != "") stack1.name = header[y1][0];
			if (parhst[ppt].sely2 != "") stack2.name = header[y2][0];
			else {
				stack2.name = "";
				stack2.showlegend = false;
			}
			if (parhst[ppt].sely3 != "") stack3.name = header[y3][0];
			else {
				stack3.name = "";
				stack3.showlegend = false;
			}
			if (parhst[ppt].sely4 != "") stack4.name = header[y4][0];
			else {
				stack4.name = "";
				stack4.showlegend = false;
			}

			
			slayout.title.text += "  -  File: " + fname;
			if (parhst[ppt].gtitle !== "") slayout.title.text = parhst[ppt].gtitle;
			if (parhst[ppt].xtitle !== "") slayout.xaxis.title.text = parhst[ppt].xtitle;
			if (parhst[ppt].ytitle !== "") slayout.yaxis.title.text = parhst[ppt].ytitle;

      if (parhst[ppt].selz1 == "") sdata = [stack1, stack2, stack3, stack4, strace1, strace2, strace3];
      if (parhst[ppt].selz1 != "") sdata = [stack1, stack2, stack3, stack4, strace1, strace2, strace3, zstack];

      nn = 0;
			for (n = 0; n < vdat.length; n = n + rel) {
				ind = Math.trunc(n);
				stack1.x[nn] = vdat[ind].x;
				stack1.y[nn] = vdat[ind].y1;
				zstack.x[nn] = vdat[ind].x;
				zstack.y[nn] = vdat[ind].z;
				if (parhst[ppt].stsel != 'ADD') {
					if (parhst[ppt].sely2 != "") {
						stack2.x[nn] = vdat[ind].x;
						stack2.y[nn] = vdat[ind].y2;
					}
					if (parhst[ppt].sely3 != "") {
						stack3.x[nn] = vdat[ind].x;
						stack3.y[nn] = vdat[ind].y3;
					}
					if (parhst[ppt].sely4 != "") {
						stack4.x[nn] = vdat[ind].x;
						stack4.y[nn] = vdat[ind].y4;
					}
				} else {
					if (vdat[ind].x >= hstmin && vdat[ind].x <= hstmax) {
						strace3.x[nn] = vdat[ind].x;
						strace3.y[nn] = average;
					}
				}
				nn++;
			}
			// histogram minimum
			if (parhst[ppt].showhist) {
				strace1.x[0] = hstmin;
				strace1.y[0] = ymin;
				strace1.x[1] = hstmin;
				strace1.y[1] = ymax;
				sdata.push(strace1);
			}
			// histogram maximum
			if (parhst[ppt].showhist) {
				strace2.x[0] = hstmax;
				strace2.y[0] = ymin;
				strace2.x[1] = hstmax;
				strace2.y[1] = ymax;
				sdata.push(strace2);
			}

			tp = stack1.x.length;

			if (average <= parhst[ppt].colsc[0][0]) strace3.line.color = parhst[ppt].colsc[0][1];
			if (average > parhst[ppt].colsc[0][0] && average < parhst[ppt].colsc[1][0]) strace3.line.color = parhst[ppt].colsc[1][1];
			if (average > parhst[ppt].colsc[1][0] && average < parhst[ppt].colsc[2][0]) strace3.line.color = parhst[ppt].colsc[2][1];
			if (average > parhst[ppt].colsc[2][0]) strace3.line.color = parhst[ppt].colsc[3][1];

			if (parhst[ppt].logdis) {
				slayout.yaxis.type = "log";
				slayout.yaxis.dtick = "";
				slayout.yaxis.range = [Math.log10(ymin), Math.log10(ymax)];
			}
			if (parhst[ppt].zlogdis) {
				slayout.yaxis2.type = "log";
				slayout.yaxis2.dtick = "";
				slayout.yaxis2.range = [Math.log10(zmin), Math.log10(zmax)];
			}
			tmptl = slayout.title.text;

			// Create graphics 
			try {
				Plotly.newPlot('IDgrp', sdata, slayout, {
					showLink: false,
					showSendToCloud: false,
					editable: true,
					responsive: true
				});
			} catch (err) {}

		}

		// {editable: true} {showLink: true} {showSendToCloud: true} {responsive: true} 

		var myPlot = document.getElementById('IDgrp');

		myPlot.on('plotly_hover', function(data) {
			evdata = data;
		});

		myPlot.on('plotly_relayout', function(data) {
			evdata = data;
			// var key = Object.keys(evdata);
			// var str = Object.values(evdata);
			// if (key == "title.text") title = str;
		});

		// click or double-click on graph
		myPlot.on('plotly_click', function(data) {
			// check single or double click (interval 0.5 sec)
			if (tplclick == 0) {
				setTimeout(function() {
					switch (tplclick) {
						case 1:
							// single click >> set histogram boundaries
							tplclick = 0;
							if (parhst[ppt].showhist) {
								var pn = '',
									tn = '',
									colors = [];
								for (var i = 0; i < data.points.length; i++) {
									var ptind = data.points[i].pointIndex;
									if (hsel == 'min') {
										hstmin = data.points[i].data.x[ptind];
										if (hstmin > hstmax) hstmax = data.points[i].data.x[data.points[i].data.x.length - 1];
										parhst[ppt].hstinpmin = hstmin;
										parhst[ppt].hstinpmax = hstmax;
										hsel = 'max';
										lntype = 'dash';
									} else {
										hstmax = data.points[i].data.x[ptind];
										if (hstmax < hstmin) hstmin = data.points[i].data.x[0];
										parhst[ppt].hstinpmin = hstmin;
										parhst[ppt].hstinpmax = hstmax;
										hsel = 'min';
										lntype = 'solid';
									}
									addhist();
									document.getElementById("IDHSTMIN").value = hstmin;
									document.getElementById("IDHSTMAX").value = hstmax;
									break;
								}
								parameters();
								graphic();
							}
							break;
						case 2:
							// increase number of ticks
							tplclick = 0;
							// parhst[ppt].hstinpmin = "";
							// parhst[ppt].hstinpmax = "";
							var dtick;
							// if (header[parhst[ppt].selx1][1] == "d" || header[parhst[ppt].selx1][1] == "t") {
							if (data.points[0].xaxis.type == "date") {
								dtick = data.points[0].xaxis.dtick;
								if (dtick > 14400000) {
									dtick = dtick / 3600000;
									dtick = parseInt(prompt("Enter tick distance (hours):", dtick)) * 3600000;
									dtick = Math.trunc(dtick / 900000) * 900000;
								} else if (dtick > 600000) {
									dtick = dtick / 60000;
									dtick = parseInt(prompt("Enter tick distance (minutes):", dtick)) * 60000;
									dtick = Math.trunc(dtick / 60000) * 60000;
								} else if (dtick > 1000) {
									dtick = dtick / 1000;
									dtick = parseInt(prompt("Enter tick distance (seconds):", dtick)) * 1000;
									dtick = Math.trunc(dtick / 1000) * 1000;
								} else {
									dtick = parseInt(prompt("Enter tick distance (seconds):", dtick));
								}

							} else {

								dtick = data.points[0].xaxis.dtick;
								dtick = parseInt(prompt("Enter tick distance:", dtick));
							}
							if (dtick !== parhst[ppt].xdtick) {
								addhist();
								parhst[ppt].xdtick = dtick;
								parameters();
								graphic();
								break;
							}
					}
					tplclick = 0;
				}, 1000);
			}
			tplclick += 1;

		});

		// event for graph zoom or axis re-scale
		myPlot.on('plotly_relayout', function(eventdata) {
			scaleaxis(eventdata);
		});

		document.getElementById('IDdetail').innerHTML += "  -  <small> Records: " + data.length + " (total) / " + vdat.length + " (selected) / " + tp + " (display) </small>";
		document.getElementById('js-plotly-tester').remove();
		var offset = document.getElementById('IDgrp').offsetHeight;
		// beep(20, 880, '0.05', 'sine', '');

		//
		setTimeout(function() {
			p2 = perfnow();
			var dt = ((p2 - p0) - 100).toFixed(2);
			document.body.style.cursor = "crosshair";
			document.title = 'Data Analysis - Graphic calculation finished';
			document.getElementById("IDDOT").className = "dotgre";
			document.getElementById('IDdetail').innerHTML += "  -  <small> Runtime: " + dt + " ms </small>";
		}, 25);

	}, 25);

	var thElm = undefined;
	var dpos;
	var upos;
	var mpos;
	var diff;

	if (!slider) {
		slider = true;
		Array.prototype.forEach.call(
			document.querySelectorAll("div.GR"),
			function(th) {
				th.style.position = 'relative';

				// var grip = document.createElement('div');
				var grip = document.getElementById('IDC');
				// grip.innerHTML = "&nbsp;";
				// grip.style.top = 0;
				// grip.style.right = 0;
				// grip.style.bottom = 0;
				// grip.style.width = '5px';
				// grip.style.position = 'absolute';
				grip.style.cursor = 'col-resize';
				grip.addEventListener('mousedown', function(e) {
					thElm = th;
					dpos = e.clientX;
					document.getElementById('IDhstbox').style.minWidth = document.getElementById('IDhst').clientWidth + 'px';
					document.getElementById('IDhstbox').style.minHeight = document.getElementById('IDhst').clientHeight + 'px';
					document.getElementById('IDgrpbox').style.minWidth = document.getElementById('IDgrp').clientWidth + 'px';
					document.getElementById('IDgrpbox').style.minHeight = document.getElementById('IDgrp').clientHeight + 'px';
					document.getElementById('IDhst').style.display = "none";
					document.getElementById('IDgrp').style.display = "none";
					// console.log("Mouse Down - " + performance.now());
				});

				document.addEventListener('mousemove', function(e) {
					if (thElm) {
						mpos = e.clientX;
						diff = mpos - dpos;
						var tHw = parhst[ppt].Hw + diff;
						var tGw = parhst[ppt].Gw - diff;
						var rel = tHw / tGw;
						if (rel < 0.20 || rel > 2) {
							return;
						}
						document.getElementById('IDhstbox').style.minWidth = tHw + 'px';
						document.getElementById('IDgrpbox').style.minWidth = tGw + 'px';
						// console.log("Mouse Move - " + performance.now());
					}
				});

				document.addEventListener('click', function(e) {
					if (thElm) {
						thElm = undefined;
						// console.log("Mouse Click - " + performance.now());
					}
				});

				document.addEventListener('mouseup', function(e) {
					if (thElm) {
						thElm = undefined;
						upos = e.clientX;
						diff = upos - dpos;
						if (Math.abs(diff) < 10) {
							document.getElementById('IDhst').style.display = "inline-block";
							document.getElementById('IDgrp').style.display = "inline-block";
							return;
						}
						parhst[ppt].ustat = true;
						addhist();
						parhst[ppt].Hw = parhst[ppt].Hw + diff;
						parhst[ppt].Gw = parhst[ppt].Gw - diff;
						if ((parhst[ppt].Hw / parhst[ppt].Gw) < 0.200) {
							parhst[ppt].Gw = Math.trunc((document.body.clientWidth - 40) * 0.800);
							parhst[ppt].Hw = Math.trunc((document.body.clientWidth - 40) * 0.200);
						}
						if ((parhst[ppt].Hw / parhst[ppt].Gw) > 2) {
							parhst[ppt].Gw = Math.trunc((document.body.clientWidth - 40) * 0.3333);
							parhst[ppt].Hw = Math.trunc((document.body.clientWidth - 40) * 0.6666);
						}
						document.getElementById('IDhstbox').style.minWidth = parhst[ppt].Hw + 'px';
						document.getElementById('IDgrpbox').style.minWidth = parhst[ppt].Gw + 'px';
						document.getElementById('IDhst').style.display = "inline-block";
						document.getElementById('IDgrp').style.display = "inline-block";
						// console.log("Mouse Up - " + performance.now());
						parhst[ppt].Gw = 0;
						parameters();
						graphic();
					}
				});

				// th.appendChild(grip);
			});
	}
}

function hexToRgbA(hex,opacity){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + opacity + ')';
    }
    return hex;
}

// round values up/down
function roundscale(value, mode = 'floor') {
	var sig = Math.sign(value);
	var flen = 0;
	value = value * sig;
	if (value == 0) return value;
	if (value < 1) flen = Math.pow(10, Math.floor(Math.log10(value)));
	else flen = 1;
	if (flen == 0) flen = 1;
	var temp = parseFloat(value) / flen * 10;
	if (mode == 'floor') {
		temp = Math.floor(temp / 2.5) * 2.5 * flen / 10;
	} else {
		temp = Math.ceil(temp / 2.5) * 2.5 * flen / 10;
	}
	temp = temp * sig;
	return temp;
}

// handle scale/zoom event
function scaleaxishist(eventdata) {
	//if (parhst[ppt].logdis) return;
	var tmp = JSON.parse(JSON.stringify(eventdata), function(key, value) {
		if (key == "legend.x") hlegposx = value;
		if (key == "legend.y") hlegposy = value;
		// console.log("Key:" + key + " Value:" + value);
	});
	parameters();
	graphic();
	return;
}

// handle scale/zoom event
function scaleaxis(eventdata) {
	var x0 = "";
	var x1 = "";
	var y0 = "";
	var y1 = "";
	var z0 = "";
	var z1 = "";
	//if (parhst[ppt].logdis) return;
	var tmp = JSON.parse(JSON.stringify(eventdata), function(key, value) {
		if (key == "xaxis.range[0]") x0 = value;
		if (key == "xaxis.range[1]") x1 = value;
		if (key == "yaxis.range[0]") y0 = value;
		if (key == "yaxis.range[1]") y1 = value;
		if (key == "yaxis2.range[0]") z0 = value;
		if (key == "yaxis2.range[1]") z1 = value;
		if (parhst[ppt].vstack == "") {
			if (key == "legend.x") mlegposx = value;
			if (key == "legend.y") mlegposy = value;
			return;
		} else {
			if (key == "legend.x") slegposx = value;
			if (key == "legend.y") slegposy = value;
			return;
		}

		// console.log("Key:" + key + " Value:" + value);
	});
	if (JSON.stringify(eventdata).includes("xaxis")) {
		try {
			// scale
			xmin = x0;
			if (isNaN(xmin)) {
				xmin = ' ' + xmin.slice(0, xlen - 1);
			} else {
				xmin = vdat[Math.trunc(xmin)].x;
			}

			xmax = x1;
			if (isNaN(xmax)) {
				xmax = ' ' + xmax.slice(0, xlen - 1);
			} else {
				xmax = vdat[Math.trunc(xmax)].x;
			}

			var val0;
			var valt0 = "@";
			var val1;
			var valt1 = "@";

			if (isNaN(x0)) {
				val0 = x0;
				val1 = x1;
				for (var n = 0; n < vdat.length; n++) {
					// try {
					// 	if ( val0.includes( vdat[n].x.trim() ) ) { 
					// 		val0 = vdat[n].x; valt0 = '' + val0;
					// 	} } catch (err) { debugger; }
					// try {
					// 	if ( val1.includes( vdat[n].x.trim() ) ) {
					// 		val1 = vdat[n].x; valt1 = '' + val1;
					// 	} } catch (err) { debugger; }
					if (x0.trim() >= vdat[n].x.trim()) {
						val0 = vdat[n].x;
						valt0 = '' + val0;
					}
					if (x1.trim() <= vdat[n].x.trim()) {
						val1 = vdat[n].x;
						valt1 = '' + val1;
						break;
					}
				}
			} else {
				var vals = evdata.xaxes[0]._vals;
				val0 = vals[0];
				valt0 = val0.text;
				val1 = vals[vals.length - 1];
				valt1 = val1.text;
			}
			if (isNaN(val0)) valt0 = valt0.replace(/\<br\>.+/, '');
			if (isNaN(val1)) valt1 = valt1.replace(/\<br\>.+/, '');

			addhist();
			if (valt0 == "@") valt0 = vdat[0].x;
			if (valt1 == "@") valt1 = vdat[vdat.length - 1].x;
			parhst[ppt].xinpmin = xmin = valt0;
			parhst[ppt].xinpmax = xmax = valt1;
			document.getElementById("IDXMIN").value = xmin;
			document.getElementById("IDXMAX").value = xmax;
			if (parhst[ppt].hstinpmin < parhst[ppt].xinpmin) parhst[ppt].hstinpmin = parhst[ppt].xinpmin;
			if (parhst[ppt].hstinpmin > parhst[ppt].xinpmax) parhst[ppt].hstinpmin = parhst[ppt].xinpmin;
			if (parhst[ppt].hstinpmax > parhst[ppt].xinpmax) parhst[ppt].hstinpmax = parhst[ppt].xinpmax;
			if (parhst[ppt].hstinpmax < parhst[ppt].xinpmin) parhst[ppt].hstinpmax = parhst[ppt].xinpmax;
			document.getElementById("IDHSTMIN").value = hstmin;
			document.getElementById("IDHSTMAX").value = hstmax;
		} catch (err) {
			return;
		}
	}
	if (JSON.stringify(eventdata).includes("yaxis.")) {
		try {
			// scale
			var tmin = parseFloat(y0);
			var tmax = parseFloat(y1);

			if (isNaN(tmin) || isNaN(tmax)) {
				return;
			}

			var sig = Math.sign(tmax);
			if (sig == -1) {
				tmax = sig * parseFloat(tmp[0][1]);
				tmin = sig * parseFloat(tmp[1][1]);
			}

			tmin = roundscale(tmin, 'floor');
			tmax = tmax - tmin;
			tmax = roundscale(tmax, 'ceil') + tmin;

			if (sig == -1) {
				ymin = sig * tmax;
				ymax = sig * tmin;
			} else {
				ymin = tmin;
				ymax = tmax;
			}
			addhist();

			if (parhst[ppt].logdis) {
				ymax = Math.pow(10, ymax).toPrecision(6);
				ymin = Math.pow(10, ymin).toPrecision(6);
			}

			parhst[ppt].ytmax = "" + ymax;
			parhst[ppt].ytmin = "" + ymin;
			document.getElementById("IDYTMIN").value = parhst[ppt].ytmin;
			document.getElementById("IDYTMAX").value = parhst[ppt].ytmax;
		} catch (err) {
			return;
		}
	}
	if (JSON.stringify(eventdata).includes("yaxis2.")) {
		try {
			// scale
			var tmin = parseFloat(z0);
			var tmax = parseFloat(z1);

			if (isNaN(tmin) || isNaN(tmax)) {
				return;
			}

			var sig = Math.sign(tmax);
			if (sig == -1) {
				tmax = sig * parseFloat(tmp[0][1]);
				tmin = sig * parseFloat(tmp[1][1]);
			}

			tmin = roundscale(tmin, 'floor');
			tmax = tmax - tmin;
			tmax = roundscale(tmax, 'ceil') + tmin;

			if (sig == -1) {
				zmin = sig * tmax;
				zmax = sig * tmin;
			} else {
				zmin = tmin;
				zmax = tmax;
			}
			addhist();

			if (parhst[ppt].logdis) {
				zmax = Math.pow(10, zmax).toPrecision(6);
				zmin = Math.pow(10, zmin).toPrecision(6);
			}

			parhst[ppt].ztmax = "" + zmax;
			parhst[ppt].ztmin = "" + zmin;
			document.getElementById("IDZTMIN").value = parhst[ppt].ztmin;
			document.getElementById("IDZTMAX").value = parhst[ppt].ztmax;
		} catch (err) {
			return;
		}
	}
	parameters();
	graphic();
	return;
}

function big() {
	if (displaymode == "graphic" && autohide) {
		var h = 12;
		var divParam = document.getElementById("IDparameter");
		divParam.style.height = h + "vh";
		document.getElementById("IDload").style.display = "block";
		document.getElementById("IDdetail").style.display = "none";
	}
}

function small() {
	if (displaymode == "graphic" && autohide) {
		var h = 1;
		var divParam = document.getElementById("IDparameter");
		divParam.style.height = h + "vh";
		document.getElementById("IDload").style.display = "none";
		document.getElementById("IDdetail").style.display = "block";
	}
}

function decsi() {
	if (decpnt == '.') document.getElementById("IDdecnot").innerHTML = "Dec.Notation: 1 023 045<font style='color:red;font-size:16px;'><b>.</b></font>06";
	if (decpnt == ',') document.getElementById("IDdecnot").innerHTML = "Dec.Notation: 1 023 045<font style='color:red;font-size:16px;'><b>,</b></font>06";
}

function decpt() {
	if (decpnt == '.') document.getElementById("IDdecnot").innerHTML = "Dec.Notation: 1,023,045<font style='color:red;font-size:16px;'><b>.</b></font>06";
	if (decpnt == ',') document.getElementById("IDdecnot").innerHTML = "Dec.Notation: 1.023.045<font style='color:red;font-size:16px;'><b>,</b></font>06";
}

function selchk() {
	var chkbox = document.getElementById('IDcheckpreview');
	if (chkbox.checked) {
		chkbox.checked = false;
	} else {
		chkbox.checked = true;
	}
}

function evtKeyDown(e) {
	if (18 == e.keyCode) try {
		document.getElementById('files').style.display = "none";
		document.getElementById('btf').style.display = "inline-block";
		var t = null;
		null !== (t = document.getElementById("files")) && t.setAttribute("webkitdirectory", "true");
	} catch {}
}

function evtKeyUp(e) {
	if (18 == e.keyCode) try {
		document.getElementById('files').style.display = "inline-block";
		document.getElementById('btf').style.display = "none";
		var t = null;
		null !== (t = document.getElementById("files")) && t.setAttribute("webkitdirectory", "false");
	} catch {}
}

function CSVToArray(strData, strDelimiter) {
	// Check to see if the delimiter is defined. If not, then default to comma.
	strDelimiter = (strDelimiter || ",");
	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
		), "gi");

	// Create an array to hold our data. Give the array a default empty first row.
	var arrData = [
		[]
	];
	// Create an array to hold our individual pattern matching groups.
	var arrMatches = null;
	// Keep looping over the regular expression matches until we can no longer find a match.
	while (arrMatches = objPattern.exec(strData)) {
		// Get the delimiter that was found.
		var strMatchedDelimiter = arrMatches[1];
		// Check to see if the given delimiter has a length (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know that this delimiter is a row delimiter.
		if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
			// Since we have reached a new row of data, add an empty row to our data array.
			arrData.push([]);
		}
		var strMatchedValue;
		// Now that we have our delimiter out of the way, let's check to see which kind of value we captured (quoted or unquoted).
		if (arrMatches[2]) {
			// We found a quoted value. When we capture this value, unescape any double quotes.
			strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
		} else {
			// We found a non-quoted value.
			strMatchedValue = arrMatches[3];
		}
		// Now that we have our value string, let's add it to the data array.
		arrData[arrData.length - 1].push(strMatchedValue);
	}

	var text = [];
	var tmp = "";
	var n = 0;
	var i = 0;
	// Return the parsed data.
	for (n = 0; n < arrData.length; n++) {
		tmp = "";
		for (i = 0; i < arrData[n].length; i++) {
			tmp += arrData[n][i];
			if (i < arrData[n].length - 1) tmp += "\t";
		}
		text[n] = tmp;
	}
	return (text);
}
function BuildInit() {
	document.title = 'Data Analysis';
	var str = "";
	str += '<div id="IDparameter" onmouseover="big();"> <pre id="IDload" style="display: inline;">Select Data file(s): <button id="btf" style="width:10em;  display:none" onclick="document.getElementById(\'files\').click();">  Select Folders  </button><input type="file" title="press Alt to select folders"  accept=".xls, .dat, .dac, .txt, .csv, .mhtml, ., .xlsx, .nmon, .dzip" id="files" multiple onchange="processFiles(event)" /></b> </pre> </div>';
	str += '<pre id="IDinfo" style="display: inline;"></pre>';
	str += '<pre id="IDoutput" style="width:99vw;"></pre>';
	str += '<pre id="IDpreview" style="overflow:scroll;"> </pre>';
	str += '<pre id="IDdata"></pre>';
	str += '<div onmouseover="small();">';
	str += '<table id="IDgraphic" style="padding: 0; margin: 0; border-collapse:collapse; display:none;">';
	str += '<tr>';
	str += '<td style="padding: 0px"><div id="IDL" style="width:0px; display: inline-block;"> </div></td>';
	str += '<td style="padding: 0px"><div id="IDhstbox"><div id="IDhst" style="display: inline-block;"></div></div></td>';
	str += '<td style="padding: 3px"><div id="IDCbox"style="width:5px; height: 100px; display: flex; justify-content: center; align-items: center;"><div class="GR" id="IDC" style="margin: 0; border-right: 2px solid gray; border-left: 2px solid gray; height:50px; display: inline-block;"></div></div></td>';
	str += '<td style="padding: 0px"><div id="IDgrpbox"><div id="IDgrp" style="display: inline-block;"></div></div></td>';
	str += '<td style="padding: 0px"><div id="IDR" style="width:0px; display: inline-block;"> </div></td>';
	str += '</tr>';
	str += '</table>';
	str += '</div>';
	str += '<br><br>';
	str += '<pre id="IDdetail"> </pre>';
	str += '<pre id="ID(C)")><small><br><br> +++ Data.Analysis.HTML is based on open-source JavaScript charting library plotly.js v1.58.4 <a href="https://plot.ly/javascript" target="_blank">https://plot.ly/javascript/</a> - <b>(C)opyright 2012-2019, Plotly, Inc.</b>  Licensed under the MIT license (<a href="https://github.com/plotly/plotly.js" target="_blank">view the source on GitHub.</a>) +++  </small></pre>';
	document.getElementById('myBody').innerHTML = str;
	// Color
	document.body.style.backgroundColor = parhst[ppt].bgcolor;
	// SAP Logo
	document.getElementById('IDload').innerHTML = "" + SAPlogo(100, 50) + " " + document.getElementById('IDload').innerHTML + "<small><font style='color:teal'> Column Separator: <input id='IDsep' oninput='getsep()' onchange='getsep()' type='text' maxlength='1' size='1' name='colsep' value='" + colsep + "'> (enter <b>S</B> for space; build in:<B> \|;,tab/ </B>)</font></small>";
	if (decpnt == '.') document.getElementById('IDload').innerHTML += "  <small><span id='IDdecnot' title='click to set decimal notation' onmouseover='decsi()' onmouseout='decpt()' onclick='decnot()'>Dec.Notation: 1,023,045<font style='color:red;font-size:16px;'><b>.</b></font>06</span></small>";
	if (decpnt == ',') document.getElementById('IDload').innerHTML += "  <small><span id='IDdecnot' title='click to set decimal notation' onmouseover='decsi()' onmouseout='decpt()' onclick='decnot()'>Dec.Notation: 1.023.045<font style='color:red;font-size:16px;'><b>,</b></font>06</span></small>";
	document.getElementById('IDload').innerHTML += "  <small><font style='color:steelblue'><span onclick='selchk(event)'><i><b>check to preview data</b></i> </span><input id='IDcheckpreview' type='checkbox' style='width:12px; height:12px; margin:0px;'></small></small>";
	// Buttons
	document.getElementById('IDoutput').innerHTML += "<br><br><button id='IDbutupd' onclick='update()'>Update</button>";
	// Text Area
	document.getElementById('IDdata').innerHTML += "<small>Copy any column separated data to the clipboard, then paste into the text area and press <i><b>Update</b></i> button or upload files with the <i><b>Choose Files</b></i> button<br></small><br>"
	document.getElementById('IDdata').innerHTML += "<textarea id='IDtextarea' ondrop='processFiles(event)' rows='30' cols='200' wrap='off' style='width:90vw; white-space:pre; overflow:scroll; overflow-x:scroll; overflow: -moz-scrollbars-horizontal; tabSize:30; font-family:Courier; font-size:10px; color:#000044' onkeydown='tabkey(event)' ></textarea><br>";
	document.getElementById('IDdata').innerHTML += "<small><i>Shift-Tab is adding tab character within text box.</i></small><br><br>";
	document.title = 'Data Analysis: select data source';
	// Version
	document.getElementById('IDdetail').innerHTML += "<small>Data.Analysis.HTML Vers. " + prgvers + "  -  <button onclick='check4update()'>Check for Update / Documentation </button>  -  need help? please contact <a href='mailto:c.weyd@sap.com?subject=Data.Analysis.HTML'>c.weyd@sap.com</a></small>";
	document.addEventListener("keydown", evtKeyDown, false);
	document.addEventListener("keyup", evtKeyUp, false);
}
// -->