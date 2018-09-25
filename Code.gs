onFormSubmit(e) {
  //
}

function Test_1() {
  //formattingFolders('1QCL3GW2vT7P9JxFmtHDecQeWcBJ427SL'); //Original
  formattingFolders('11qCKoGU7bY_y0nEQ5H-EYrQmxkUeQABV'); //My
}

function moveFolder(sourceFolderId, targetFolderId) {
  var target = DriveApp.getFolderById(targetFolderId),
      source = DriveApp.getFolderById(sourceFolderId),
      currents = source.getParents();

  while (currents.hasNext()) {
    var folder = currents.next();

    folder.removeFolder(source);
  }

  target.addFolder(source);
}

function copyFolder(sourceFolderId, targetFolderId) {
  var target = DriveApp.getFolderById(targetFolderId),
      source = DriveApp.getFolderById(sourceFolderId);

  target.addFolder(source);
}

function getMatchStringsPct(source, target) {
  var source = source.split(''),
      res = 0;

  for (var i = 0; i < target.length; i++) {
    if (target[i] == source[i]) {
      source[i] = ' ';
      res++;
    }
  }

  return ((res / source.length) * 100);
}

function formattingFolders(folderId) {
  var TZ = Session.getScriptTimeZone(),
      rootFolder = DriveApp.getFolderById(folderId),
      graphicsFolder = DriveApp.getFolderById('1f4KbFBrFbp1_VyYi8ciWAv-fmOAZd7aJ'),
      tplFolder = DriveApp.getFolderById('13p5ghAWGpR678C2MExQtKFmPpSsW_6qk'),
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
        //найденое - переместить на уровень выше
        folder.setName(prefix + folderTitle);
        moveFolder(folder.getId(), graphicsFolder.getId());
      } else {
        //ненайденое - скопировать в папку Х
        copyFolder(folder.getId(), tplFolder.getId());
      }
    }
  }
}