
class SRID:
    def __call__(self,name):
        return getattr(self, name)

srid = SRID()
_names = {}
def setup_names(**kwargs):
    """
    Sets up names referencing SRIDs for easily referring to
    projections. Takes key, value pairs of 'name', 'srid'.
    """
    _names = kwargs
    for k,v in _names.items():
        setattr(srid,k,v)
