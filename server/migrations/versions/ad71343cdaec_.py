"""empty message

Revision ID: ad71343cdaec
Revises: abff1abd0e68
Create Date: 2023-08-17 20:54:48.222742

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ad71343cdaec'
down_revision = 'abff1abd0e68'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('slate_id', sa.Integer(), nullable=True),
    sa.Column('created_by', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['users.id'], name=op.f('fk_comments_created_by_users')),
    sa.ForeignKeyConstraint(['slate_id'], ['slates.id'], name=op.f('fk_comments_slate_id_slates')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('slates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('slates', schema=None) as batch_op:
        batch_op.drop_column('description')

    op.drop_table('comments')
    # ### end Alembic commands ###
