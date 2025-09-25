import { Component, memo, PureComponent } from 'react';

type IUser = {
    name: string
    age: number
}

type IProps = {
    user: IUser
}

// functional component
// Просто memo достаточно, потому что в пропсах примитивы
const FirstComponent = memo(({ name, age }: IUser) => (
    <div>
        my name is {name}, my age is {age}
    </div>
));

// functional component
// Здесь уже объект, так что нужно более глубокое сравнение
const SecondComponent = memo(
    ({ user: { name, age } }: IProps) => (
        <div>
            my name is {name}, my age is {age}
        </div>
    ),
    (prev: IProps, next: IProps) =>
    prev.user.name === next.user.name
    && prev.user.age === next.user.age
);

// class component
// Нужно shallow сравнение, подойдёт PureComponent, просто меняем на него
// Классовый компонент при этом остаётся классовым
class ThirdComponent extends PureComponent<IUser> {
    render() {
        return (
            <div>
                my name is {this.props.name}, my age is {this.props.age}
            </div>
        )
    }
}

// class component
// Похожая ситуация как с функциональным
// Просто нужно более глубокое сравнение
// Но у классовых для этого есть shouldComponentUpdate, его можно переопределить
class FourthComponent extends Component<IProps> {
    shouldComponentUpdate(nextProps: IProps): boolean {
        const prev = this.props.user;
        const next = nextProps.user;

        const prevName = prev?.name ?? "";
        const nextName = next?.name ?? "";

        const prevAge = prev?.age ?? NaN;
        const nextAge = next?.age ?? NaN;

        const hasChanged = prevName !== nextName || prevAge !== nextAge;

        return hasChanged;
    };
    render() {
        return (
            <div>
                my name is {this.props.user.name}, my age is {this.props.user.age}
            </div>
        )
    };
}