/* eslint-disable react/jsx-key */
import { useEffect, useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import { useRowSelectColumn } from "@lineup-lite/hooks";
import { data } from "../data/dummy";
import StatusPill from "./StatusPill";

const OverviewTable = () => {
  const columns: any = useMemo(
    () => [
      {
        Header: "User Id",
        accessor: "userId",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Last Login",
        accessor: "lastLoginTime",
      },
      {
        Header: "Registeration time",
        accessor: "registrationTime",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useRowSelectColumn
  );

  useEffect(() => {
    setPageSize(data.length);
  }, [setPageSize]);

  return (
    <div className="flex h-full items-center">
      <div className="mt-2 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className=" border-b border-gray-200 shadow sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-10">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="text-20 rounded-sm px-6 py-5 text-lg font-medium uppercase tracking-wider text-gray-400"
                        >
                          {column.render("Header")}
                          {column.id === "selection" &&
                            column.render("Summary")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="divide-y divide-gray-200 bg-white"
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="whitespace-nowrap px-6 py-5 font-sans text-lg"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTable;
