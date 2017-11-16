import fs from 'fs'
import path from 'path'
import rewire from 'rewire'
import mock from 'mock-fs'
import chalk from 'chalk'
import test from 'ava'
import { log } from 'util'
import { ENOENT } from 'constants'

const begynner = rewire(path.join(__dirname, 'index.js'))

const successLog = begynner.__get__('successLog')
const readFile = begynner.__get__('readFile')
const createFolder = begynner.__get__('createFolder')
const createFile = begynner.__get__('createFile')

test('return a success message', t => {
	const message = `${chalk.green("✔︎")} Success message!`

	t.is(successLog('Success message!'), message)
})

test.before('mock', t => {
	mock({
		'/test': {
			'file.txt': 'file content'
		}
	})
})

test.after('cleanup', t => {
	mock.restore()
})

test('read a file', t => {
	t.is(readFile('/test/file.txt'), 'file content')
})

test('create a folder', t => {
	const folder = '/test/test-folder'

	t.is(createFolder(folder), `${folder} folder created!`)
})

test('create a file', t => {
	const folder = '/test/test-folder'
	const file = 'text.txt'

	t.is(createFile(folder, file, 'file content'), `${folder}/${file} created!`)
})


