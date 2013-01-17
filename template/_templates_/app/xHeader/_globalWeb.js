/**
 * [% SRC_LOC = '_global.js' %]
 * GLOBALS
 *
 */

goog.provide('LL');//LOG LEVEL

/**
 * @type {boolean}
 * @const
 */
LL.ON = true;

/**
 * @type {boolean}
 * @const
 */
LL.INFO = true;

/**
 * @type {boolean}
 * @const
 */
LL.FINEST = true;

/**
 * @type {boolean}
 * @const
 */
LL.ALL = true;

goog.provide('app.GLOBAL');

/**
 * target page after login unless changed later
 * @type string
 */
app.GLOBAL.TARGET_PAGE = 'MainLauncher';

/** @type {boolean} */
app.GLOBAL.TRUSTED_DEVICE = false;
/** @type {Object} */
app.dispatch = {};
