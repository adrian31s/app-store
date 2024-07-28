package app.product.types.cooler.dao;

import app.common.base.dao.BaseDao;
import app.product.types.cooler.model.Cooler;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CoolerDao extends BaseDao<Cooler> {
    @Override
    public Class<Cooler> getClazz() {
        return Cooler.class;
    }
}
