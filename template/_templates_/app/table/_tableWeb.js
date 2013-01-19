[%divId="table"%]
[%SRC_LOC="_" _ divId _ "Web.js"%]

goog.provide('[%divId%]Web');
goog.require('[%divId%]Web.view');
/**
 * SRC: [%SRC_LOC%]
 * @param {Object} args_ the args to pass to the show function.
 *
 */
[%divId%]Web.show = function(args_) {
  var rows = [
  {
    id: 0,
      name: 'test0'
  },
  {
    id: 1,
    name: 'test1'
  },
  {
    id: 2,
    name: 'test2'
  },
  {
    id: 3,
    name: 'test3'
  }


  ];
  //var tableDef = new ma.TableDef();
  //tableDef.addColumn(new ma.ColumnDef('id'));
  //tableDef.addColumn(new ma.ColumnDef('name'));
  //tableDef.setData(rows);
  app.setMainContent([%divId%]Web.view.getPrimary(null, null));
  var tbl = new ma.elbat();
  tbl.tableName = 'testskidoo';
  tbl.tableDef.data = rows;
  tbl.tableDef.addColumn(new ma.ColumnDef({name: 'id'}));
  tbl.tableDef.addColumn(new ma.ColumnDef({name: 'name'}));
  tbl.construct();


  // goog.events.listen(
  //    goog.dom.getElement(''),
  //    goog.events.EventType.CLICK,
  //    goog.partial(app.showPage, '[%divId%]')
  //    );

};

goog.provide('ma.elbat');
/**
 * SRC:[%SRC_LOC%]
 *
 * @constructor
 */
ma.elbat = function() {
  /** @type {ma.TableDef} */
  this.tableDef = new ma.TableDef();
  /** @type {string} */
  this.tableName = 'defaultTableName'
};

/**
 * SRC:[%SRC_LOC%]
 * @return {ma.TableDef} the table definition.
 */
ma.elbat.prototype.getTableDef = function() {
  return this.tableDef;
};


/**
 * SRC:[%SRC_LOC%]
 */
ma.elbat.prototype.construct = function() {
  var tableOut = '<div id="' + this.tableName + 'DivId">';
  tableOut +='<table id="' + this.tableName + 'TableId">';
  tableOut += this.buildHeader();
  tableOut += this.buildData();
  tableOut += '</table>';
  tableOut += '</div>';
  goog.dom.getElement(this.tableName).innerHTML = tableOut;
};

/**
 * SRC:[%SRC_LOC%]
 * @return {string} the table header.
 */
ma.elbat.prototype.buildHeader = function() {
  var header = '<thead>';
  var columnLength = this.tableDef.getColumnCount();
  for (var i = 0; i < columnLength; i++) {
    header += this.buildHeaderCell(i);
  }
  header += '</thead>';
  return header;
};

/**
 * @param {number} columnId the column to display.
 * @return {string}
 */
ma.elbat.prototype.buildHeaderCell = function (columnId){
  var thcell='';
  var tc = this.tableDef.getColumn(columnId);
  if (tc.visible){
    thcell = '<th>' + tc.name + '</th>';
  }
  return thcell;
}

/**
 * SRC:[%SRC_LOC%]
 * @return {string} the tablebody.
 */
ma.elbat.prototype.buildData = function() {
  var tbody = '<tbody>';
  var rowLength = this.tableDef.data.length;
  var colLength = this.tableDef.getColumnCount();
  for (var i = 0; i < rowLength; i++) {
    tbody += '<tr>';//[%divId%]Web.view.row(tableDef_.getRow(i),null);
    for (var j = 0; j < colLength; j++) {
      tbody += this.buildCell(i,j);
    }
    tbody += '</tr>';
  }
  tbody += '</tbody>';
  return tbody;
};

/**
 * SRC:[%SRC_LOC%]
 * @return {string} the table cell.
 * @param {Object} tr the table row.
 * @param {Object} tc the table column def.
 */
ma.elbat.prototype.buildCell = function(trId, tcId) {
  var tr = this.tableDef.getRow(trId);
  var tc = this.tableDef.getColumn(tcId);
  var cell ='';
  if (tc.visible){
    cell ='<td>' + tr[tc.name] + '</td>';
  }
  return cell;
};

/**
 *
 */
goog.provide('ma.TableDef');

/**
 * SRC:[%SRC_LOC%]
 *
 * @constructor
 */
ma.TableDef = function() {
  this.columns = new Array();
  this.data = new Array;
};

/**
 * SRC:[%SRC_LOC%]
 * @param {ma.ColumnDef} newColumn the column definition.
 */
ma.TableDef.prototype.addColumn = function(newColumn) {
  this.columns.push(newColumn);
};
/**
 * SRC:[%SRC_LOC%]
 * @param {number} rowNumber the rownumber.
 * @return {Object} the data row.
 */
ma.TableDef.prototype.getRow = function(rowNumber) {
  return this.data[rowNumber];
};
/**
 * SRC:[%SRC_LOC%]
 * @return {number}  the number ofrows in the table.
 */
ma.TableDef.prototype.getRowCount = function() {
  return this.data.length;
};
/**
 * SRC:[%SRC_LOC%]
 * @param {number} colNumber the array index of the column number.
 * @return {ma.ColumnDef} the column Definition.
 */
ma.TableDef.prototype.getColumn = function(colNumber) {
  return this.columns[colNumber];
};
/**
 * SRC:[%SRC_LOC%]
 * @return {number} the number of columns.
 */
ma.TableDef.prototype.getColumnCount = function() {
  return this.columns.length;
};






/**
 * SRC:[%SRC_LOC%]
 * @constructor
 * @param {object} columnName the name.
 */
ma.ColumnDef = function(options) {
  /** @type {string} */
  this.name = typeof options.name !== 'undefined' ? options.name :'defaultName';
  /** @type {boolean} */
  this.visible = typeof options.visible !== 'undefined' ? options.visible : true;
};


/**
 * SRC:[%SRC_LOC%]
 *
 */
[%divId%]Web.init = function() {
  if (LL.ON) {
    [%divId%]Web.logger = goog.debug.Logger.getLogger('[%divId%]');
    [%divId%]Web.logger.setLevel(app.GLOBAL.LOG_LEVEL);
  }
  if (LL.INFO) [%divId%]Web.logger.info('Initialized');
  app.dispatch['[%divId%]'] = [%divId%]Web.show;
};
[%divId%]Web.init();

