import { DataTypes } from 'sequelize';

const wishlist = {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
	itemId: {
		type: DataTypes.UUID,
		references: {
			model: 'items',
		}
	},
	userId: {
		type: DataTypes.UUID,
		references: {
			model: 'users',
		}
	},
};

export default wishlist;