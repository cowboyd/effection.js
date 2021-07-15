"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const expect_1 = __importDefault(require("expect"));
const core_1 = require("@effection/core");
let captured;
function* boom() {
    throw new Error('boom');
}
const myResource = {
    *init() {
        return yield core_1.spawn();
    }
};
index_1.describe('@effection/mocha', () => {
    // TODO: how can we test that a test should fail? Spawn external mocha process?
    // it('throws error', function*(task) {
    //   task.spawn(function*() {
    //     try {
    //       yield sleep(3);
    //     } finally {
    //       throw new Error('boom');
    //     }
    //   });
    //   yield sleep(10);
    // });
    //
    // it('throws error directly', function*(task) {
    //   throw new Error('boom');
    // });
    index_1.it('can have pending tasks (note: this is not actually pending)');
    index_1.describe('accessing mocha API', () => {
        index_1.it('works', function* () {
            this.timeout(100);
        });
    });
    index_1.describe('cleaning up tasks', () => {
        index_1.it('sets up task', function* (task) {
            captured = yield core_1.spawn().within(task);
        });
        index_1.it('and cleans it up', function* () {
            expect_1.default(captured.state).toEqual('halted');
        });
    });
    index_1.describe('captureError', () => {
        index_1.it('returns error thrown by given operation', function* () {
            expect_1.default(yield index_1.captureError(boom)).toHaveProperty('message', 'boom');
        });
        index_1.it('throws an error if given operation does not throw an error', function* () {
            expect_1.default(yield index_1.captureError(index_1.captureError(function* () { }))).toHaveProperty('message', 'expected operation to throw an error, but it did not!');
        });
    });
    index_1.describe('spawning in world', () => {
        index_1.beforeEach(function* (world) {
            captured = yield core_1.spawn().within(world);
        });
        index_1.it('does not halt the spawned task before it block', function* () {
            expect_1.default(captured.state).toEqual('running');
        });
    });
    index_1.describe('spawning in scope', () => {
        index_1.beforeEach(function* (_world, scope) {
            captured = yield core_1.spawn().within(scope);
        });
        index_1.it('halts the spawned task before it block', function* () {
            expect_1.default(captured.state).toEqual('halted');
        });
    });
    index_1.describe('spawning resource in world', () => {
        index_1.beforeEach(function* () {
            captured = yield myResource;
        });
        index_1.it('keeps running beyond the before each block', function* () {
            expect_1.default(captured.state).toEqual('running');
        });
    });
});
//# sourceMappingURL=mocha.test.js.map