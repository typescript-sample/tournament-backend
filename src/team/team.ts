import { Attributes, Filter, Repository, Service } from 'onecore';

export interface Teams {
    id: string;
    name: string;
    decription: string;
    logo: string;
    status: string;
}
export interface TeamFilter extends Filter {
    id: string;
    name: string;
    decription: string;
    logo: string;
    status: string;
}
export interface TeamRepository extends Repository<Teams, string> {
}
export interface TeamService extends Service<Teams, string, TeamFilter> {
}
export const TeamModel: Attributes = {
    id: {
        key: true,
        match: 'equal'
    },
    name: {},
    decription: {},
    logo: {},
    status: {},
};
