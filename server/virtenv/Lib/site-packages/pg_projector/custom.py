from pandas import read_csv
from .models import Projection

def setup_projections(session, csvfile):
    """ Read custom projections from csv file and add to database.
    """
    data = read_csv(csvfile,
            quotechar="'",
            quoting=1,
            skipinitialspace=True)

    for i, row in data.iterrows():
        model = session.query(Projection).get(row.srid)
        if not model:
            model = Projection()
        for k,v in row.iteritems():
            setattr(model,k,v)
        session.add(model)
    session.commit()
