import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import ts from 'typescript';
const source=readFileSync(new URL('../src/lib/scanMatching.ts',import.meta.url),'utf8');
const {outputText}=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}});
const {findClientMatch,findProductMatch}=await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

test('client matching handles corporate abbreviations without guessing ambiguous companies',()=>{
  const clients=[{name:'Fixture client A'},{name:'Fixture client'},{name:'Fixture client B'}];
  assert.equal(findClientMatch(clients,'㈱Fixture client シートメタル課'),clients[0]);
  assert.equal(findClientMatch(clients,'Fixture'),undefined);
  assert.equal(findClientMatch([{name:'(株)Fixture client'}],'(株)Fixture client シートメタル課')?.name,'(株)Fixture client');
  assert.equal(findClientMatch([{name:'Fixture client A'},{name:'(株)Fixture client'}],'Fixture client'),undefined);
});

test('product code is authoritative, matching is client-scoped and duplicate names require review',()=>{
  const products=[{clientName:'Fixture client A',productName:'タンク (TOP)',productNumber:'NSQ-F0124-05'},
    {clientName:'Fixture client A',productName:'タンク (TOP)',productNumber:'NSQ-F0124-06'},
    {clientName:'株式会社他社',productName:'タンク (TOP)',productNumber:'OTHER-01'}];
  assert.equal(findProductMatch(products,'(株)Fixture client','タンク(TOP)','ＮＳＱ－Ｆ０１２４－０５'),products[0]);
  assert.equal(findProductMatch(products,'(株)Fixture client','タンク (TOP)','UNSEEN-01'),undefined);
  assert.equal(findProductMatch(products,'(株)Fixture client','タンク (TOP)',''),undefined);
  assert.equal(findProductMatch(products,'(株)Fixture client','タンク (TOP)','OTHER-01'),undefined);
});
