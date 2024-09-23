import assert from "assert";

it("has a text input", async () => {
  const dom = await render("index.html");
  // console.log(dom);
  const input = dom.window.document.querySelector("input");
  assert(input);
});

it("Shows a success message with a valid email", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  input.value = "mr@gmail.com";
  dom.window.document
    .querySelector("form")
    .dispatchEvent(new dom.window.Event("submit"));
  const h1 = dom.window.document.querySelector("h1");
  // console.log(h1.innerHTML);
  assert.strictEqual(h1.innerHTML, "Form Submit");
});

it("Shows a fail message with a invalid email", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  input.value = "mrgmail.com";
  dom.window.document
    .querySelector("form")
    .dispatchEvent(new dom.window.Event("submit"));
  const h1 = dom.window.document.querySelector("h1");
  // console.log(h1.innerHTML);
  assert.strictEqual(h1.innerHTML, "Invalid Email");
});
