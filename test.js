import assert from 'node:assert';
import { log } from 'node:console';
import p from './index.js';

const pass = msg => log('\u001B[32m'+'[pass]'+'\u001B[39m' + ' : ' + msg);
const fail = msg => log('\u001B[31m'+'[fail]'+'\u001B[39m' + ' : ' + msg);

function test(msg, fn) {
    let status = true;
    try {
        fn(assert);
    } catch (error) {
        status = false;
    }
    status ? pass(msg) : fail(msg);
}

log('\nModifiers');

test('bold', t => {
    t.equal(p.bold('bold'), '<b>bold</b>');
});

test('italic', t => {
    t.equal(p.italic('italic'), '<i>italic</i>');
});

test('underline', t => {
    t.equal(p.underline('underline'), '<u>underline</u>');
});

test('strikethrough', t => {
    t.equal(p.strikethrough('strikethrough'), '<s>strikethrough</s>');
});

test('dim', t => {
    t.equal(p.dim('dim'), '<span style="opacity:0.5;">dim</span>');
});

log('\nText colors');

test('black', t => {
    t.equal(p.black('black text'), '<span style="color:#000000;">black text</span>');
});

test('white', t => {
    t.equal(p.white('white text'), '<span style="color:#FFFFFF;">white text</span>');
});

log('\nBackground colors');

test('bgBlack', t => {
    t.equal(p.bgBlack('black bg'), '<span style="background-color:#000000;">black bg</span>');
});

test('bgWhite', t => {
    t.equal(p.bgWhite('white bg'), '<span style="background-color:#FFFFFF;">white bg</span>');
});

log('\nNested styles');

test('black text on white background', t => {
    t.equal(p.bgWhite.black.bold('black & white'), '<span style="background-color:#FFFFFF;color:#000000;"><b>black & white</b></span>');
});

test('white text on black background', t => {
    t.equal(p.bgBlack.white.bold('white & black'), '<span style="background-color:#000000;color:#FFFFFF;"><b>white & black</b></span>');
});

log('\nMultiple arguments');

test('Thank you very much', t => {
    t.equal(p.white('Thank', 'you', 'very', 'much'), '<span style="color:#FFFFFF;">Thank you very much</span>');
});

log('\n:) I\'m glad you tested \u001B[36mchalko\u001B[39m\n');
