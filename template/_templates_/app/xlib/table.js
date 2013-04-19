//[% SRC_LOC="_tableCommon.js" %]
goog.provide('ma.plugin.table');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.KeyHandler.EventType');
goog.require('goog.ui.Component');

/**
 * SRC:[%SRC_LOC%]
 *
 * @extends {goog.ui.Component}
 * @constructor
 */
ma.plugin.table = function() {
  /** @type {string} */
  this.tableName = '';
  this.columns = new Array();
  this.data = new Array();
  this.sortColumns = new Array();
  this.sortOrder = 'ASC';
  this.trIdPrefix = '';
  this.tdIdPrefix = '';
  this.idColumn = '';
  this.tableName = 'defaultTableName';
  this.trClass = '';
  /**
   * Event handler for this object.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eh_ = new goog.events.EventHandler(this);

  /**
   * Keyboard handler for this object. This object is created once the
   * component's DOM element is known.
   *
   * @type {goog.events.KeyHandler?}
   * @private
   */
  this.kh_ = null;

};

goog.inherits(ma.plugin.table, goog.ui.Component);

/**
 * Creates an initial DOM representation for the component.
 * SRC:[%SRC_LOC%]
 * Don't know what this is doing yet, but think it will append a div inside the element passed
 * in
 *
 */
ma.plugin.table.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div',{'id':'fromcreateDom'}));
};

/**
 * Decorates an existing HTML DIV element as a table.
 *
 * SRC:[%SRC_LOC%]
 * @param {Element} element The DIV element to decorate. 
 */
ma.plugin.table.prototype.decorateInternal = function(element) {
ma.plugin.table.superClass_.decorateInternal.call(this, element);
var elem = this.getElement();
  var tableOut = '<div id="' + this.tableName + 'DivId">';
  tableOut +='<table id="' + this.tableName + 'TableId">';
  tableOut += this.buildHeader();
  tableOut += this.buildData();
  tableOut += '</table>';
  tableOut += '</div>';
  elem.innerHTML = tableOut;

  this.kh_ = new goog.events.KeyHandler(elem);
  this.eh_.listen(this.kh_, goog.events.KeyHandler.EventType.KEY, this.onKey_);
};

/** @override */
ma.plugin.table.prototype.disposeInternal = function() {
  ma.plugin.table.superClass_.disposeInternal.call(this);
  this.eh_.dispose();
  if (this.kh_) {
    this.kh_.dispose();
  }
};

/**
 * Called when component's element is known to be in the document.
 */
ma.plugin.table.prototype.enterDocument = function() {
  ma.plugin.table.superClass_.enterDocument.call(this);
  this.eh_.listen(this.getElement(), goog.events.EventType.CLICK,
      this.onDivClicked_);
};


/**
 * Called when component's element is known to have been removed from the
 * document.
 */
ma.plugin.table.prototype.exitDocument = function() {
  ma.plugin.table.superClass_.exitDocument.call(this);
  this.eh_.unlisten(this.getElement(), goog.events.EventType.CLICK,
      this.onDivClicked_);
};




/**
 * SRC:[%SRC_LOC%]
 * @return {string} the table header.
 */
ma.plugin.table.prototype.buildHeader = function() {
  var header = '<thead>';
  var columnLength = this.getColumnCount();
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
ma.plugin.table.prototype.buildHeaderCell = function (columnId){
  var thcell='';
  var tc = this.getColumn(columnId);
  if (tc.visible){
    thcell = '<th>' + tc.name + '</th>';
  }
  return thcell;
}

/**
 * SRC:[%SRC_LOC%]
 * @return {string} the tablebody.
 */
ma.plugin.table.prototype.buildData = function() {
  var tbody = '<tbody>';
  var rowLength = this.data.length;
  var rowNdx;
  var colNdx;
  if (this.sortColumns.length > 0) {
    var sortFunction = function (sortColumns, sortOrder, a,b) {
      var result
        var sortColumn1 = sortColumns[0];
      if (a[sortColumns[0]] < b[sortColumns[0]]) result = -1;
      else if (a[sortColumns[0]] > b[sortColumns[0]]) result = 1; 
      else {
        if (typeof sortColumns[1] !== 'undefined' ){
          if (a[sortColumns[1]] < b[sortColumns[1]]) result = -1;
          else if (a[sortColumns[1]] > b[sortColumns[1]]) result = 1; 
          else  result = 0;
        } else {
          result = 0;
        }
      }
      if (sortOrder === 'DESC') {result *= -1;}
      return result;
    };
    goog.array.sort(this.data, goog.partial(
          sortFunction,this.sortColumns, this.sortOrder));

  }   

  for (rowNdx = 0; rowNdx < rowLength; rowNdx++) {
    tbody += this.buildRow(rowNdx);
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
ma.plugin.table.prototype.buildCell = function(tr, tcId) {
  var tc = this.getColumn(tcId);
  var cell ='';
  if (tc.visible){
    cell = '<td id ="td' + tc.name ;
    cell += this.getRowId(tr) + '">';
    cell += tr[tc.name] + '</td>';
  }
  return cell;
};

ma.plugin.table.prototype.buildRow = function(rowNdx){
  var rowId;
  var currentRow = this.getRow(rowNdx);
  var rowStr = '';
  var colLength = this.getColumnCount();
  rowStr += '<tr id="' + this.getRowPrefix() + this.getRowId(currentRow, rowNdx);
  rowStr +=  '" class="' + currentRow.trClass + '">';
  for (var colNdx = 0; colNdx < colLength; colNdx++) {
    rowStr += this.buildCell(currentRow,colNdx);
  }
  rowStr += '</tr>';
  return rowStr;
}

ma.plugin.table.prototype.getRowId = function(row, rowNdx){
  var rowId='';
  if (this.idColumn !== '') {
    rowId = row[this.idColumn];
  } else {
    rowId = rowNdx;
  }
  return rowId;
}

ma.plugin.table.prototype.getRowPrefix = function() {
  var rowPrefix ='';
  if (this.trIdPrefix !== '') { 
    rowPrefix = this.trIdPrefix;
  } else {
    rowPrefix = 'defaultTrId';
  }
  return rowPrefix;
}

/**
 * SRC:[%SRC_LOC%]
 * @param {ma.ColumnDef} newColumn the column definition.
 */
ma.plugin.table.prototype.addColumn = function(newColumn) {
  this.columns.push(newColumn);
};
/**
 * SRC:[%SRC_LOC%]
 * @param {number} rowNumber the rownumber.
 * @return {Object} the data row.
 */
ma.plugin.table.prototype.getRow = function(rowNumber) {
  return this.data[rowNumber];
};
/**
 * SRC:[%SRC_LOC%]
 * @return {number}  the number ofrows in the table.
 */
ma.plugin.table.prototype.getRowCount = function() {
  return this.data.length;
};
/**
 * SRC:[%SRC_LOC%]
 * @param {number} colNumber the array index of the column number.
 * @return {ma.ColumnDef} the column Definition.
 */
ma.plugin.table.prototype.getColumn = function(colNumber) {
  return this.columns[colNumber];
};
/**
 * SRC:[%SRC_LOC%]
 * @return {number} the number of columns.
 */
ma.plugin.table.prototype.getColumnCount = function() {
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

