from pyproj import Proj, transform
from functools import partial

def transformation(source, sink):
    """Returns a shapely-compatible coordinate transformation
    between two coordinate systems. The input coordinates should
    be represented by mappings of CRS parameters.
    """
    return partial(transform, Proj(source), Proj(sink))
