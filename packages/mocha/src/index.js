"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureError = exports.it = exports.afterEach = exports.beforeEach = exports.describe = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-explicit-any */
const mocha_1 = __importDefault(require("mocha"));
const core_1 = require("@effection/core");
let world;
mocha_1.default.beforeEach(async function () {
    await core_1.Effection.reset();
    world = core_1.run();
});
mocha_1.default.afterEach(async function () {
    world.halt();
    await world.catchHalt();
    world = undefined;
    await core_1.Effection.halt();
});
function runInWorld(fn) {
    return async function () {
        await core_1.run({ init: fn.bind(this) }, { resourceScope: world });
    };
}
exports.describe = mocha_1.default.describe;
exports.beforeEach = (fn) => mocha_1.default.beforeEach(runInWorld(fn));
exports.afterEach = (fn) => mocha_1.default.afterEach(runInWorld(fn));
exports.it = Object.assign((title, fn) => mocha_1.default.it(title, fn ? runInWorld(fn) : fn), {
    only: (title, fn) => mocha_1.default.it.only(title, runInWorld(fn)),
    skip: (title, fn) => mocha_1.default.it.skip(title, runInWorld(fn)),
});
function captureError(op) {
    return function* () {
        try {
            yield op;
        }
        catch (error) {
            return error;
        }
        throw new Error('expected operation to throw an error, but it did not!');
    };
}
exports.captureError = captureError;
//# sourceMappingURL=index.js.map