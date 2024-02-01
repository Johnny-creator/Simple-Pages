"""Initial migrate

Revision ID: 51257421fc0e
Revises: 
Create Date: 2023-12-30 19:28:26.264628

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '51257421fc0e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('username', sa.Text(), nullable=False),
    sa.Column('password', sa.Text(), nullable=False),
    sa.Column('email', sa.Text(), nullable=False),
    sa.Column('activation_UUID', sa.UUID(), nullable=True),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_banned', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('sites',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('user_id', sa.BigInteger(), nullable=True),
    sa.Column('title', sa.String(length=80), nullable=True),
    sa.Column('sect1Title', sa.String(length=80), nullable=True),
    sa.Column('sect1Text', sa.Text(), nullable=True),
    sa.Column('sect2Title', sa.String(length=80), nullable=True),
    sa.Column('sect2Text', sa.Text(), nullable=True),
    sa.Column('sect3Title', sa.String(length=80), nullable=True),
    sa.Column('sect3Text', sa.Text(), nullable=True),
    sa.Column('sect4Title', sa.String(length=80), nullable=True),
    sa.Column('sect4Text', sa.Text(), nullable=True),
    sa.Column('sect5Title', sa.String(length=80), nullable=True),
    sa.Column('sect5Text', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sites')
    op.drop_table('users')
    # ### end Alembic commands ###