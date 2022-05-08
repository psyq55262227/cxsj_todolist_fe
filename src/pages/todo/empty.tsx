import { FC, ReactElement } from "react";
import { Icon } from "semantic-ui-react";

const Empty: FC = (): ReactElement => (
    <section className="text-center text-lg text-yellow-700/40 flex flex-col items-center justify-center space-y-2">
        <Icon name="inbox" size="big" />
        <span>暂无内容</span>
    </section>
)
export default Empty;