$("document").ready(() => {
  $("#grow").click(() => {
    $("#textbox").animate({ width: "500px" }, 2000);
  });

  $("#move").click(() => {
    $("#textbox").animate({ marginLeft: "200px" }, 1000);
  });

  $("#bigger").click(() => {
    $("#textbox").animate({ fontSize: "20px" }, 2000);
  });

  $("#manythings").click(() => {
    $("#textbox").animate(
      { fontSize: "18px", marginLeft: "100px", width: "600px" },
      2000
    );
  });
});
