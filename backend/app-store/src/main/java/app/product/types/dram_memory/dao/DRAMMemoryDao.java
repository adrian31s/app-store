package app.product.types.dram_memory.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.types.dram_memory.model.DRAMMemory;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DRAMMemoryDao extends BaseDao<DRAMMemory> {
    @Override
    public Class<DRAMMemory> getClazz() {
        return DRAMMemory.class;
    }
}
