import path from 'path'
import rewire from 'rewire'
import mock from 'mock-fs'
import chalk from 'chalk'
import test from 'ava'

const begynner = rewire(path.join(__dirname, 'index.js'))

const successLog = begynner.__get__('successLog')
const readFile = begynner.__get__('readFile')
const createFolder = begynner.__get__('createFolder')
const createFile = begynner.__get__('createFile')

test.before(t => {
	mock({
		'./tests': {
			'file.txt': 'File content'
		}
	})
})

test.after(t => {
	mock.restore()
})

test('successLog - without parameter', t => {
	t.is(successLog(), `Function ${successLog.name} missing parameter Text`)
})

test('successLog', t => {
	t.is(successLog('Success message!'), `${chalk.green("✔︎")} Success message!`)
})

test('createFolder - without parameter', t => {
	t.is(createFolder(), `Function ${createFolder.name} missing parameter Folder`)
})

test('createFolder', t => {
	const folder = './tests/test'

	t.is(createFolder(folder), `${folder} folder created!`)
})

// test('createFile', t => {
// 	const folder = './tests'
// 	const file = 'text.txt'
// 	const fileContent = 'File content'

// 	t.is(createFile(folder, file, fileContent), `${folder}/${file} created!`)
// 	t.is(readFile(`${folder}/${file}`), fileContent)
// })

// test('readFile', t => {
// 	t.is(readFile('./tests/file.txt'), 'File content')
// })

