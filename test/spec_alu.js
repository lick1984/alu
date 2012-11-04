
describe("BitArray Spec Test", function() {
	var normal_ba;
	var small_ba;
	var big_ba;

	beforeEach(function() {
		normal_ba = new BitArray(10, 0x355);
		small_ba = new BitArray(10, -1);
		big_ba = new BitArray(10, 0xFFF);
	});

	it("normal get methods", function() {
		expect(normal_ba.GetWide()).toEqual(10);
		expect(normal_ba.GetValue()).toEqual(0x355);
	});
	
	it("if value is bigger than maximum, round-off upper bits", function() {
		expect(big_ba.GetValue()).toEqual(0xFFF & 0x3FF);
	});

	it("if value is smaller than zero, set zero", function() {
		expect(small_ba.GetValue()).toEqual(0);
	});

	it("after Not method apply, value should be in bit wide", function() {
		normal_ba.Not();
		expect(normal_ba.GetValue()).toEqual(0xAA);
	});

	it("when expand bit wide, only update wide", function() {
		normal_ba.ExpandWide(12);
		expect(normal_ba.GetWide()).toEqual(12);
	});

	it("when shrink bit wide, cut-off if needed", function() {
		normal_ba.ShrinkWide(8);
		expect(normal_ba.GetValue()).toEqual(0x355 & 0xFF);
	});

	it("when set bigger value, check maximum value and round-off if needed", function() {
		normal_ba.SetValue(0xFFF);
		expect(normal_ba.GetValue()).toEqual(0x3FF);
	});

	it("when set smaller value, check minimum value and set zero if needed", function() {
		normal_ba.SetValue(-1);
		expect(normal_ba.GetValue()).toEqual(0);
	});
	
	it("mask should be round-off if bigger than the wide and only update masked bits", function() {
		normal_ba.ModifyValue(0x7FFFFCF0, 0xFFFFF0A0);
		expect(normal_ba.GetValue()).toEqual(0x3A5);
	});
});
