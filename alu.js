
var BitArray = function(wide, value) 
{
	this._wide = wide || 0;
	this._value = value || 0;
	this._Round();
};

BitArray.prototype._Round = function() 
{
	if (this._wide < 0)	
		this._wide = 0;

	if (this._wide > 32) 
		this._wide = 32;

	if (this._value < 0)
		this._value = 0;

	this._value &= (1 << this._wide) - 1;
};

BitArray.prototype.GetWide = function() 
{
	return this._wide;
};

BitArray.prototype.GetValue = function() 
{
	return this._value;
};

BitArray.prototype.SetValue = function(value)
{
	this._value = value;
	this._Round();
}

BitArray.prototype.ModifyValue = function(mask, value)
{
	var cutoff_value = value & (mask & (1 << this._wide) - 1);
	this._value = (this._value & (~mask >>> 0)) | cutoff_value;
};

BitArray.prototype.ExpandWide = function(wide)
{
	this._wide = wide;
	this._Round();
};

BitArray.prototype.ShrinkWide = BitArray.prototype.ExpandWide;

BitArray.prototype.Not = function()
{
	this._value = (~this._value) >>> 0;
	this._Round();
};
