fun public vector_sum(in _a)
{
    _sum = 0;
    for(_i=0; _i < size(_a); _i++)
        _sum = _sum + _a[_i];
    return(_sum);
}