onFormSubmit(e) {
  //
}

function Test_1() {
  //formattingFolders('1QCL3GW2vT7P9JxFmtHDecQeWcBJ427SL');
}

function getMatchStringsPct(src, dst) {
  var src = src.split(''),
      res = 0;

  for (var i = 0; i < dst.length; i++) {
    if (dst[i] == src[i]) {
      src[i] = ' ';

      res++;
    }
  }

  return ((res / src.length) * 100);
}

function formattingFolders(folderId) {
  var TZ = Session.getScriptTimeZone(),
      rootFolder = DriveApp.getFolderById(folderId),
      folders = rootFolder.getFolders(),
      ss = SpreadsheetApp.openById('1JEqPQJSiBliliqw1y-wrrdP6ikU11DPuIF72l-rN84g'),
      sheet = ss.getSheetByName('Incoming_Data'),
      values = sheet.getRange('J3:I').getValues();

  for (var i=0; i < values.length; i++) {
    var date = values[i][0],
        title = values[i][1];

    while (folders.hasNext()) {
      var folder = folders.next(),
          folderName = folder.getName(),
          folderTitle = folderName.substring(15),
          comparisonPct = getMatchStringsPct(title.toLowerCase(), folderTitle.toLowerCase());

      if (comparisonPct > 25) {
        var prefix = Utilities.formatDate(date, TZ, '[ yyyy.MM.dd ] ');
      }
    }
  }
}