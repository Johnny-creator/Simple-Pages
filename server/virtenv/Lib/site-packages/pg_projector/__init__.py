# -*- coding: utf-8 -*-

__author__ = 'Daven Quinn'
__email__ = 'code@davenquinn.com'
__version__ = '0.1.0'

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from .custom import setup_projections
from .transform import transformation
from .util import setup_names, srid

def integrate_models(cls, nbase):
    new_bases = list(cls.__bases__) + [nbase]
    new_dict = dict(cls.__dict__)
    new_dict.update(dict(nbase.__dict__))
    return type.__new__(cls.__class__,
        cls.__name__, tuple(new_bases), new_dict)

def init_models(db_or_metadata):
    """
    Set up database models using either Flask-SQLAlchemy object
    or SQLAlchemy database metadata object.
    """
    try:
        # We're using a Flask-SQLAlchemy database object
        # We can integrate models to support fancy querying
        # and shortcuts!
        model = db_or_metadata.Model
        Base.metadata = model.metadata
    except AttributeError:
        # A basic SQLAlchemy metadata object was provided
        model = None
        Base.metadata = db_or_metadata
    from .models import Projection
    if model is not None:
        return integrate_models(Projection,model)
    else:
        return Projection

def PGProjector(app, db):
    """
    Convenience method for Flask startup,
    encompassing model and shortcut initialization.

    Config options
    PROJECTION_NAMES
    WORLD_PROJECTION
    LOCAL_PROJECTION
    """
    _ = lambda x: app.config.get(x,None)
    p = app.config.get('PROJECTION_NAMES')
    p.update(
        world = _('WORLD_PROJECTION'),
        local = _('LOCAL_PROJECTION'))

    setup_names(**{k:v
        for k,v in p.items()
        if v is not None})

    return init_models(db)

