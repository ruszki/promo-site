const InternalConfigType = {
    ClientDev: 0,
    ClientProd: 1,
    ServerDev: 2,
    ServerProd: 3,
    Test: 4,
    Coverage: 5
};

class ConfigType {
    constructor(internalConfigType) {
        this.internalConfigType = internalConfigType;
    }

    isClient() {
        switch (this.internalConfigType) {
            case InternalConfigType.ClientDev:
            case InternalConfigType.ClientProd:
                return true;
            default:
                return false;
        }
    }

    isServer() {
        switch (this.internalConfigType) {
            case InternalConfigType.ServerDev:
            case InternalConfigType.ServerProd:
                return true;
            default:
                return false;
        }
    }

    isDev() {
        switch (this.internalConfigType) {
            case InternalConfigType.ClientDev:
            case InternalConfigType.ServerDev:
                return true;
            default:
                return false;
        }
    }

    isProd() {
        switch (this.internalConfigType) {
            case InternalConfigType.ClientProd:
            case InternalConfigType.ServerProd:
                return true;
            default:
                return false;
        }
    }

    isTest() {
        switch (this.internalConfigType) {
            case InternalConfigType.Test:
            case InternalConfigType.Coverage:
                return true;
            default:
                return false;
        }
    }

    isCoverage() {
        switch (this.internalConfigType) {
            case InternalConfigType.Coverage:
                return true;
            default:
                return false;
        }
    }
}

module.exports = {
    ClientDev: new ConfigType(InternalConfigType.ClientDev),
    ClientProd: new ConfigType(InternalConfigType.ClientProd),
    ServerDev: new ConfigType(InternalConfigType.ServerDev),
    ServerProd: new ConfigType(InternalConfigType.ServerProd),
    Test: new ConfigType(InternalConfigType.Test),
    Coverage: new ConfigType(InternalConfigType.Coverage)
};
