package app.product.types.hard_drive.dao;

import app.common.base.dao.BaseDao;
import app.product.types.hard_drive.model.HardDrive;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HardDriveDao extends BaseDao<HardDrive> {
    @Override
    public Class<HardDrive> getClazz() {
        return HardDrive.class;
    }
}
