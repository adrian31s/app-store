package app.product.types.pc_case.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.types.pc_case.model.PcCase;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PcCaseDao extends BaseDao<PcCase> {
    @Override
    public Class<PcCase> getClazz() {
        return PcCase.class;
    }
}
