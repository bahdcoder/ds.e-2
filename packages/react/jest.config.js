module.exports = {
    roots: ['<rootDir>/src'],
    testRegex: '(/.*\\.test)\\.(ts|tsx|js)$',
    // transform: {
    //     '^.+\\.tsx?$': 'ts-jest',
    // },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
