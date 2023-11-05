package app.product.types.processor.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.types.processor.model.Processor;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProcessorDao extends BaseDao<Processor> {
    @Override
    public Class<Processor> getClazz() {
        return Processor.class;
    }
}
