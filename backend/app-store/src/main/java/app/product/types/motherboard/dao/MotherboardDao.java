package app.product.types.motherboard.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.types.motherboard.model.Motherboard;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MotherboardDao extends BaseDao<Motherboard> {
    @Override
    public Class<Motherboard> getClazz() {
        return Motherboard.class;
    }
}
