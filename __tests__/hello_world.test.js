const { helloWorld } = require("../code-to-unit-test/hello_world.js");

test("helloWorld returns a string", () => {
    expect(typeof helloWorld()).toBe("string");
});

test("helloWorld returns 'Hello, World!'", () => {
    expect(helloWorld()).toBe("Hello, World!");
});