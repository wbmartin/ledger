[%divId="table"%]
[%SRC_LOC="_" _ divId _ "Web.js"%]

goog.provide('[%divId%]Web');
goog.require('[%divId%]Web.view');


/**
 *
 * @constructor
 */
[%divId%]Web = function(){
   this.logger_.setLevel(app.GLOBAL.LOG_LEVEL);
  this.logger_.info('Initialized');
  app.dispatch['[%divId%]'] = [%divId%]Web.show;

}
/**
 * A reference to the  logger
 * @type {goog.debug.Logger}
 * @private
 */
[%divId%]Web.prototype.logger_ = goog.debug.Logger.getLogger('[%divId%]');

/**
 * SRC: [%SRC_LOC%]
 * @param {Object} args_ the args to pass to the show function.
 *
 */
[%divId%]Web.prototype.show = function(args_) {
  var rows = [
  {
    id: 0,
      name: 'A'
  },
  {
    id: 1,
    name: 'B'
  },
  {
    id: 2,
    name: 'C'
  },
  {
    id: 3,
    name: 'D'
  },
  {
    id: 4,
    name: 'A'
  }
  ];
  app.setMainContent([%divId%]Web.view.getPrimary(null, null));
  var tbl = new ma.plugin.table();
  tbl.tableName = 'testskidoo';
  tbl.data = rows;
  tbl.addColumn(new ma.ColumnDef({name: 'id'}));
  tbl.addColumn(new ma.ColumnDef({name: 'name'}));
  tbl.sortColumns = ['name'];
  tbl.sortOrder = 'ASC';
  tbl.idColumn = 'id';
  tbl.trIdPrefix = 'test';
  tbl.construct();

};


