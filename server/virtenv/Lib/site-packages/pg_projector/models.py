from fiona.crs import from_string
from sqlalchemy import Column, Integer, String

from . import Base

class Projection(Base):
    __tablename__ = "spatial_ref_sys"
    srid = Column(Integer, primary_key=True)
    auth_name = Column(String(256))
    auth_srid = Column(Integer)
    srtext = Column(String(2048))
    proj4text = Column(String(2048))

    @property
    def wkt(self):
        return self.srtext

    @property
    def proj4(self):
        return self.proj4text

    @property
    def crs(self):
        return from_string(self.proj4)
